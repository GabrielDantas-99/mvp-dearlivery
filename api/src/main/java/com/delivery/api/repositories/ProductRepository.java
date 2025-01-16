package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.entities.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
