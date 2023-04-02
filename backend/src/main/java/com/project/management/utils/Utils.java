package com.project.management.utils;

import com.project.management.entities.Product;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public class Utils {

    public static String TYPE = "text/csv";

    // find the availability for the shelf
    public static int getShelfAvailability(List<Product> prodList, int max_capacity) {
        int usedSpace = 0;
        for (Product prod : prodList) {
            usedSpace += prod.getQuantity();
        }
        return max_capacity - usedSpace;
    }

    public static Map<Integer,Integer> getShelfUsedSpace(List<Product> allProducts){
        // it stores the capacity of all the shelf and will be used for color coding
        Map<Integer,Integer> shelfUsedSpace=new HashMap<>();
        allProducts.forEach(product->{
            if(shelfUsedSpace.containsKey(product.getShelfNumber())){
                shelfUsedSpace.put(product.getShelfNumber(),shelfUsedSpace.get(product.getShelfNumber())+product.getQuantity());
            } else{
                shelfUsedSpace.put(product.getShelfNumber(),product.getQuantity());
            }
        });
        return shelfUsedSpace;
    }

    // check if product is already exists with same name, category, price, and vendor
    public static Product productAlreadyExists(List<Product> prodList, Product product) {
        Product prodExisting = prodList.stream()
                .filter(prod -> {
                    return product.getProductName().equals(prod.getProductName())
                            && product.getCategory().equals(prod.getCategory())
                            && product.getPricePerUnit().equals(prod.getPricePerUnit())
                            && product.getVendorLink().equals(prod.getVendorLink());
                })
                .findAny()
                .orElse(null);
        return prodExisting;
    }

    public static List<Product> csvToProducts(MultipartFile file) {
        List<Product> products = new ArrayList<Product>();

        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Product p = new Product();
                p.setProductName(csvRecord.get("productName"));
                p.setQuantity(Integer.parseInt(csvRecord.get("quantity")));
                p.setCategory(csvRecord.get("category"));
                p.setPricePerUnit(Float.parseFloat(csvRecord.get("pricePerUnit")));
                p.setShelfNumber(Integer.parseInt(csvRecord.get("shelfNumber")));
                p.setVendorLink(csvRecord.get("vendorLink"));

                products.add(p);
            }

            return products;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static boolean hasCSVFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static boolean productMatchContent(Product p, String content){
        if(p.getProductName().toLowerCase().contains(content.toLowerCase()) ||
                p.getCategory().toLowerCase().contains(content.toLowerCase()) ||
                p.getVendorLink().toLowerCase().contains(content.toLowerCase())){
            return true;
        }

        if(p.getQuantity().toString().equals(content) ||
                p.getShelfNumber().toString().equals(content) ||
                p.getPricePerUnit().toString().equals(content)){
            return true;
        }
        return false;
    }

}

