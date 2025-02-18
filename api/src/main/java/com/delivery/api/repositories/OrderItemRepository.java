package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.domain.entities.OrderItem;
import com.delivery.api.domain.pk.OrderItemPK;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {

}
