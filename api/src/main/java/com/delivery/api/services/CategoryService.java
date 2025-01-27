package com.delivery.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.delivery.api.domain.entities.Category;
import com.delivery.api.repositories.CategoryRepository;
import com.delivery.api.services.exceptions.DatabaseException;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public List<Category> findAll() {
    List<Category> list = categoryRepository.findAll();
    return list;
  }

  public Category findById(Long productId) {
    Optional<Category> product = categoryRepository.findById(productId);
    return product.orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));
  }

  public Category create(Category product) {
    return categoryRepository.save(product);
  }

  public Category update(Category productDto) {
    try {
      Category entity = categoryRepository.getReferenceById(productDto.getId());
      entity.setName(productDto.getName());
      return categoryRepository.save(entity);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException(productDto.getId());
    }
  }

  public void delete(Long productId) {
    try {
      categoryRepository.deleteById(productId);
    } catch (EmptyResultDataAccessException e) {
      throw new ResourceNotFoundException(productId);
    } catch (DataIntegrityViolationException e) {
      throw new DatabaseException(e.getMessage());
    }
  }

}
