package com.project.management.jparepository;

import com.project.management.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetails extends JpaRepository<Product,Long> {


    List<Product> findAllByShelfNumber(Integer shelfNumber);
    List<Product> findAllByProductName(String name, Pageable page);
}
