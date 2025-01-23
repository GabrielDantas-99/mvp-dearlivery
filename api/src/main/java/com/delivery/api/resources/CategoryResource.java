package com.delivery.api.resources;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.delivery.api.entities.domain.Category;
import com.delivery.api.services.CategoryService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryResource {

  private final CategoryService categoryService;

  @GetMapping
  @PreAuthorize("permitAll()")
  public ResponseEntity<List<Category>> findAll() {
    List<Category> list = categoryService.findAll();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/{productId}")
  @PreAuthorize("permitAll()")
  public ResponseEntity<Category> findById(@PathVariable Long productId) {
    Category product = categoryService.findById(productId);
    return ResponseEntity.ok().body(product);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Category> create(@RequestBody Category productDto) {
    Category newCategory = categoryService.create(productDto);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(newCategory.getId()).toUri();
    return ResponseEntity.created(uri).body(newCategory);
  }

  @PutMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Category> update(@RequestBody Category productDto) {
    Category product = categoryService.update(productDto);
    return ResponseEntity.ok().body(product);
  }

  @DeleteMapping("/{productId}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long productId) {
    categoryService.delete(productId);
    return ResponseEntity.noContent().build();
  }

}
