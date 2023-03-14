package com.project.management.controller.impl;


import com.project.management.controller.interf.ManagementController;
import com.project.management.entities.Product;
import com.project.management.service.impl.ManagementServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
public class ManagementControllerImpl implements ManagementController {

    @Autowired
    public ManagementServiceImpl managementService;

    @Override
    public ResponseEntity<String> addProduct(Product input){
        try{
          String msg = this.managementService.saveProduct(input);
            return ResponseEntity.status(HttpStatus.OK).body(msg);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        try{
            this.managementService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Object> getProductById(Long id){
        try{
           Product res= this.managementService.getProductById(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Object> getProductsByName(String name, Integer pageNumber, Integer pageSize) {
        try{
            List<Product> products = this.managementService.getProductsByName(name,pageNumber,pageSize);
            return ResponseEntity.status(HttpStatus.OK).body(products);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Object> getAllProduct(String sortBy, String fieldName, Integer pageNumber, Integer pageSize) {
        try{
            Page<Product> products =  this.managementService.getProducts(sortBy,fieldName,pageNumber,pageSize);
            return ResponseEntity.status(HttpStatus.OK).body(products);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> updateProduct(Product input) {
        try {
            String msg = this.managementService.updateProduct(input);
            return ResponseEntity.status(HttpStatus.OK).body(msg);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> upload(MultipartFile file) {
        try {
             String msg = this.managementService.uploadFile(file);
            return ResponseEntity.status(HttpStatus.OK).body(msg);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}


