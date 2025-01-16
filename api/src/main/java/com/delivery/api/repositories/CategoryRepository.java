package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.entities.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
