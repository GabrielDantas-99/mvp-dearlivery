package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.domain.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
