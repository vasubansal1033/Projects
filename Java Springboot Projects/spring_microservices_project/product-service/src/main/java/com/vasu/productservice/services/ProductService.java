package com.vasu.productservice.services;

import com.vasu.productservice.dto.ProductRequest;
import com.vasu.productservice.dto.ProductResponse;
import com.vasu.productservice.model.Product;
import com.vasu.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;

    public void createProduct(ProductRequest productRequest) {
        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(productRequest.getPrice())
                .build();

        productRepository.save(product);
        log.info("Product {} is saved! ", product.getId());
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> allProducts = productRepository.findAll();
        return  allProducts.stream().map(this::mapProductToResponse).collect(Collectors.toList());
    }

    private ProductResponse mapProductToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }
}
