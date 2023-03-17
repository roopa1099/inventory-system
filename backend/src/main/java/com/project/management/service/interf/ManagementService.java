package com.project.management.service.interf;

import com.project.management.entities.Product;
import com.project.management.models.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ManagementService {

    public String saveProduct(Product product) throws Exception;

    public Product getProductById(Long id) throws Exception;

    public String updateProduct(Product product) throws Exception;

    public void deleteProduct(Long id);

    public Page<Product> getProducts(SearchRequest request);

    public List<Product> getProductsByName(String name, int pageNumber,int pageSize) throws Exception;

    public String uploadFile(MultipartFile file) throws Exception;

    public List<Product> findProductsByContent(String content) throws Exception;
}

