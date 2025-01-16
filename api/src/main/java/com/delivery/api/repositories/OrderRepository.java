package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.entities.domain.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
