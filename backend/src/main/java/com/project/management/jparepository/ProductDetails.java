package com.project.management.jparepository;

import com.project.management.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetails extends JpaRepository<Product,Long> {
    List<Product> findAllByShelfNumber(Integer shelfNumber);
    List<Product> findAllByProductName(String name, Pageable page);
    Page<Product> findAllByCategory(String category, Pageable page);
    Page<Product> findAllByVendorLink(String vendorLink, Pageable page);
    Page<Product> findAllByPricePerUnit(Float pricePerUnit, Pageable page);
    Page<Product> findByCategoryAndVendorLink(String category, String vendorLink, Pageable page);
    Page<Product> findByCategoryAndPricePerUnit(String category, Float pricePerUnit, Pageable page);
    Page<Product> findByVendorLinkAndPricePerUnit(String vendorLink, Float pricePerUnit, Pageable page);
    Page<Product> findByCategoryAndVendorLinkAndPricePerUnit(String category, String vendorLink, Float pricePerUnit, Pageable page);
}
