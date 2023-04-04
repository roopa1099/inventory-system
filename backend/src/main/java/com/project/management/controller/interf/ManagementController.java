package com.project.management.controller.interf;

import com.project.management.entities.Product;
import com.project.management.models.SearchRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping
public interface ManagementController {


    @PostMapping(path = "/product", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> addProduct(
            @RequestBody Product input
    );


    @DeleteMapping(path = "/products")
    @ResponseBody
    public ResponseEntity<String> deleteProducts( @RequestBody List<Long> ids);


    @GetMapping(path = "/product/{id}")
    @ResponseBody
    public ResponseEntity<Object> getProductById(
            @PathVariable Long id);


    @PostMapping(path = "/products")
    @ResponseBody
    public ResponseEntity<Object> getAllProduct(@RequestBody SearchRequest request);


    @PutMapping(path = "/product")
    @ResponseBody
    public ResponseEntity<String> updateProduct(
            @RequestBody Product input
    );


    @GetMapping(path = "/product/search/{name}")
    @ResponseBody
    public ResponseEntity<Object> getProductsByName(
            @PathVariable String name, @RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "0")Integer pageSize);


    @PostMapping(path = "/product/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> upload(
            @RequestPart MultipartFile file);


    @GetMapping(path = "/product/find/{content}")
    @ResponseBody
    public ResponseEntity<Object> findProductsByContent(
            @PathVariable String content);
}
