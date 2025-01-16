package com.delivery.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.delivery.api.entities.domain.Product;
import com.delivery.api.repositories.ProductRepository;
import com.delivery.api.services.exceptions.DatabaseException;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository productRepository;

  public List<Product> findAll() {
    List<Product> list = productRepository.findAll();
    return list;
  }

  public Product findById(Long productId) {
    Optional<Product> product = productRepository.findById(productId);
    return product.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));
  }

  public Product create(Product product) {
    return productRepository.save(product);
  }

  public Product update(Product productDto) {
    try {
      Product entity = productRepository.getReferenceById(productDto.getId());
      updateData(entity, productDto);
      return productRepository.save(entity);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException(productDto.getId());
    }
  }

  public void delete(Long productId) {
    try {
      productRepository.deleteById(productId);
    } catch (EmptyResultDataAccessException e) {
      throw new ResourceNotFoundException(productId);
    } catch (DataIntegrityViolationException e) {
      throw new DatabaseException(e.getMessage());
    }
  }

  private void updateData(Product oldObj, Product newObj) {
    oldObj.setTitle(newObj.getTitle());
    oldObj.setDescription(newObj.getDescription());
    oldObj.setImgUrl(newObj.getImgUrl());
    oldObj.setInStock(newObj.getInStock());
  }

}
