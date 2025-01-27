package com.delivery.api.resources;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.delivery.api.domain.entities.Product;
import com.delivery.api.services.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductResource {

  private final ProductService productService;

  @GetMapping
  public ResponseEntity<List<Product>> findAll() {
    List<Product> list = productService.findAll();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/{productId}")
  public ResponseEntity<Product> findById(@PathVariable Long productId) {
    Product product = productService.findById(productId);
    return ResponseEntity.ok().body(product);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Product> create(@RequestBody Product productDto) {
    Product newProduct = productService.create(productDto);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(newProduct.getId()).toUri();
    return ResponseEntity.created(uri).body(newProduct);
  }

  @PutMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Product> update(@RequestBody Product productDto) {
    Product product = productService.update(productDto);
    return ResponseEntity.ok().body(product);
  }

  @DeleteMapping("/{productId}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long productId) {
    productService.delete(productId);
    return ResponseEntity.noContent().build();
  }

}
