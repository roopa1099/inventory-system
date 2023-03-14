package com.project.management.entities;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="PRODUCT", indexes = @Index(columnList = "shelf_number"))
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "category")
    private String category;

    @Column(name = "price_per_unit", nullable = false)
    private Float pricePerUnit;

    @Column(name = "shelf_number")
    private Integer shelfNumber;

    @Column(name = "vendor_link")
    private String vendorLink;

    @Transient
    private int avlSpaceForShelf;
}
