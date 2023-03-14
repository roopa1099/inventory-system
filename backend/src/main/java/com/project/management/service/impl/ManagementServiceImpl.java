package com.project.management.service.impl;

import com.project.management.entities.Product;
import com.project.management.jparepository.ProductDetails;
import com.project.management.service.interf.ManagementService;
import com.project.management.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class ManagementServiceImpl implements ManagementService {

    @Autowired
    private ProductDetails productJpaRepo;

    static int max_capacity=20;

    @Override
    public String saveProduct(Product product) throws Exception{

        List<Product> prodList=this.productJpaRepo.findAllByShelfNumber(product.getShelfNumber());
        // calculate the available space for the specified shelf
        int availability = Utils.getShelfAvailability(prodList, max_capacity);
        if(availability == 0){
            throw new Exception("No space left in the shelf");
        } else if (availability < product.getQuantity()){
            throw new Exception("Insufficient space, only "+ availability + "kg space left");
        } else{
            // check if product already exists
            Product prodExisting = Utils.productAlreadyExists(prodList, product);

            // product already exists, refill the stock
            if(prodExisting!=null){
                prodExisting.setQuantity(prodExisting.getQuantity()+product.getQuantity());
                this.productJpaRepo.save(prodExisting);
            }
            else{
                // add a new product entry
                this.productJpaRepo.save(product);
            }
        }

        return "Product saved successfully";
    }

    @Override
    public  Page<Product> getProducts(String sortBy, String field,int pageNumber,int pageSize) {
        List<Product> allProducts= this.productJpaRepo.findAll();
        // it stores the capacity of all the shelf and will be used for color coding
        Map<Integer,Integer> shelfUsedSpace = Utils.getShelfUsedSpace(allProducts);

        Pageable page = getPageable(pageNumber,pageSize,sortBy,field);
        Page<Product> allProductsPage= this.productJpaRepo.findAll(page);

        // sets the available space for all the products based on their shelf
        allProductsPage.forEach(product -> {
                product.setAvlSpaceForShelf(max_capacity - shelfUsedSpace.get(product.getShelfNumber()));
            });

            return allProductsPage;
    }

    @Override
    public Product getProductById(Long id) throws Exception {
        if(id==null){
            throw new Exception("Id is empty");
        }
        Product res= this.productJpaRepo.findById(id).orElse(null);
        if(res==null){
            throw new Exception("No product exists with "+ id + " id");
        }
        return res;
    }

    @Override
    public List<Product> getProductsByName(String name, int pageNumber,int pageSize) throws Exception {
        if(name==null){
            throw new Exception("product name should not be empty");
        }

        List<Product> allProducts= this.productJpaRepo.findAll();
        // it stores the capacity of all the shelf and will be used for color coding
        Map<Integer,Integer> shelfUsedSpace = Utils.getShelfUsedSpace(allProducts);

        // get the paginated products by name in sorted order by product name
        Pageable page = getPageable(pageNumber,pageSize,"ASC","productName");
        List<Product> allProductsPage= this.productJpaRepo.findAllByProductName(name,page);
        // sets the available space for all the products based on their shelf
        allProductsPage.forEach(product -> {
            product.setAvlSpaceForShelf(max_capacity - shelfUsedSpace.get(product.getShelfNumber()));
        });
        return allProductsPage;
    }

    @Override
    public String updateProduct(Product product) throws Exception {
        List<Product> prodList=this.productJpaRepo.findAllByShelfNumber(product.getShelfNumber());
        int availability = Utils.getShelfAvailability(prodList, max_capacity);

       Product currentProduct = this.productJpaRepo.findById(product.getId()).orElse(null);
       if(currentProduct == null){
           throw new Exception("Product doesn't exists");
        }

       // shelf number remains same after update
       if(currentProduct.getShelfNumber() == product.getShelfNumber()){
           if(availability >= (product.getQuantity()-currentProduct.getQuantity())){
               SaveOrUpdateExistingProduct(prodList,product);
           } else{
               throw new Exception("No space left in this shelf. Please try with another shelf");
           }
        } else{
           // shelf number changed
           if(availability >= product.getQuantity()){
               SaveOrUpdateExistingProduct(prodList,product);
           }else {
               throw new Exception("No space left in this shelf. Please try with another shelf");
           }
        }
        return "Product updated successfully";
    }

    @Override
    public void deleteProduct(Long id) {
            this.productJpaRepo.deleteById(id);
    }

    @Override
    public String uploadFile(MultipartFile file) throws Exception{
        if (Utils.hasCSVFormat(file)) {
            try {
                // extract all the products from the csv file
                List<Product> result = Utils.csvToProducts(file);
                this.productJpaRepo.saveAll(result);
                return  "Uploaded the file successfully: " + file.getOriginalFilename();
            } catch (Exception e) {
                throw new Exception("Could not upload the file: "+file.getOriginalFilename());
            }
        }
        throw new Exception("Invalid csv file format");
    }

    // get the sorted and paginated records
    public Pageable getPageable(int pageNumber, int pagSize, String sortBy, String field) {
        Sort sort = sortBy.equalsIgnoreCase(Sort.Direction.ASC.name())?
                Sort.by(field).ascending(): Sort.by(field).descending();

       return PageRequest.of(pageNumber,pagSize,sort);
    }

    // update the quantity of the existing product if all the params matched
    // else create a new entry
    public void SaveOrUpdateExistingProduct(List<Product> prodList, Product product){
        Product prodExisting = Utils.productAlreadyExists(prodList, product);
        if(prodExisting != null){
            if(prodExisting.getId() == product.getId()){
                productJpaRepo.save(product);
            } else{
                prodExisting.setQuantity(prodExisting.getQuantity()+product.getQuantity());
                productJpaRepo.save(prodExisting);
                productJpaRepo.delete(product);
            }
        }else{
            productJpaRepo.save(product);
        }
    }

}
