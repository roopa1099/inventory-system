package com.project.management.controller.interf;

import com.project.management.entities.Product;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RequestMapping
public interface ManagementController {

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/product", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> addProduct(
            @RequestBody Product input
    );

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/product/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById( @PathVariable Long id);

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/product/{id}")
    @ResponseBody
    public ResponseEntity<Object> getProductById(
            @PathVariable Long id);

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/products")
    @ResponseBody
    public ResponseEntity<Object> getAllProduct(String sortBy, String fieldName, @RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "0")Integer pageSize);

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/product")
    @ResponseBody
    public ResponseEntity<String> updateProduct(
            @RequestBody Product input
    );

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/product/search/{name}")
    @ResponseBody
    public ResponseEntity<Object> getProductsByName(
            @PathVariable String name, @RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "0")Integer pageSize);

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/product/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> upload(
            @RequestPart MultipartFile file);
}
