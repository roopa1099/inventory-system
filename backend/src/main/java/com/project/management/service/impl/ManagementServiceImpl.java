package com.project.management.service.impl;

import com.project.management.entities.Product;
import com.project.management.jparepository.ProductDetails;
import com.project.management.models.Filter;
import com.project.management.models.Pagination;
import com.project.management.models.SearchRequest;
import com.project.management.models.SortBy;
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
    public  Page<Product> getProducts(SearchRequest request) {
        List<Product> allProducts= this.productJpaRepo.findAll();
        // it stores the capacity of all the shelf and will be used for color coding
        Map<Integer,Integer> shelfUsedSpace = Utils.getShelfUsedSpace(allProducts);

        Pageable page = getPageable(request.getPagination(), request.getSortBy());
        Page<Product> allProductsPage= filterProducts(page,request.getFilterBy());

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
        Pageable page = getPageable(null,null);
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


    private void deleteProductById(Long id) {
        this.productJpaRepo.deleteById(id);
    }

    @Override
    public void deleteProducts(List<Long> productIds) {
        productIds.forEach(productId ->{
            this.deleteProductById(productId);
        });

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

    @Override
    public List<Product> findProductsByContent(String content) throws Exception {
        if(content==null){
            throw new Exception("content should not be empty");
        }

        List<Product> allProducts= this.productJpaRepo.findAll();

        List<Product> filteredProducts= new ArrayList<>();
        // it stores the capacity of all the shelf and will be used for color coding
        Map<Integer,Integer> shelfUsedSpace = Utils.getShelfUsedSpace(allProducts);

        allProducts.forEach(product -> {
            if(Utils.productMatchContent(product,content)){
                product.setAvlSpaceForShelf(max_capacity - shelfUsedSpace.get(product.getShelfNumber()));
                filteredProducts.add(product);
            }
        });

        return filteredProducts;
    }

    // get the sorted and paginated records
    public Pageable getPageable(Pagination pagination, SortBy sortBy) {
        Sort sort=null;
        if(sortBy != null){
            sort = sortBy.isDescending()? Sort.by(sortBy.getField()).descending(): Sort.by(sortBy.getField()).ascending();
        }

        if(sortBy != null){
            return PageRequest.of(pagination.getPageNumber(),pagination.getPageSize(),sort);
        }
        return PageRequest.of(pagination.getPageNumber(),pagination.getPageSize());
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

    public Page<Product> filterProducts(Pageable page, Filter filter){
        if(filter == null){
            return this.productJpaRepo.findAll(page);
        }

        boolean categoryFilter = filter.getCategory() != null;
        boolean pricePerUnitFilter = filter.getPricePerUnit() != 0.0;
        boolean VendorLinkFilter = filter.getVendorLink() != null;

        if(categoryFilter && pricePerUnitFilter && VendorLinkFilter){
            return this.productJpaRepo.findByCategoryAndVendorLinkAndPricePerUnit(filter.getCategory(), filter.getVendorLink(), filter.getPricePerUnit(),page);
        }
        else if(categoryFilter && pricePerUnitFilter){
            return this.productJpaRepo.findByCategoryAndPricePerUnit(filter.getCategory(), filter.getPricePerUnit(),page);
        }
        else if(categoryFilter && VendorLinkFilter){
            return this.productJpaRepo.findByCategoryAndVendorLink(filter.getCategory(), filter.getVendorLink(),page);
        }
        else if(pricePerUnitFilter && VendorLinkFilter){
            return this.productJpaRepo.findByVendorLinkAndPricePerUnit(filter.getVendorLink(), filter.getPricePerUnit(),page);
        }
        else if(categoryFilter){
            return this.productJpaRepo.findAllByCategory(filter.getCategory(),page);
        }
        else if(pricePerUnitFilter){
            return  this.productJpaRepo.findAllByPricePerUnit(filter.getPricePerUnit(),page);
        }
        else if(VendorLinkFilter){
            return  this.productJpaRepo.findAllByVendorLink(filter.getVendorLink(),page);
        }
        return this.productJpaRepo.findAll(page);
    }

}
