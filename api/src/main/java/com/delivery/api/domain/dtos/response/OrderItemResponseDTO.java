package com.delivery.api.domain.dtos.response;

import com.delivery.api.domain.entities.OrderItem;

public record OrderItemResponseDTO(
    Integer quantity,
    Long productId) {
  OrderItemResponseDTO(OrderItem orderItem) {
    this(orderItem.getQuantity(), orderItem.getProduct().getId());
  }
}
