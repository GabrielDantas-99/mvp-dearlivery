package com.delivery.api.domain.dtos.request;

public record OrderItemRequestDTO(
        Integer quantity,
        Long productId) {
}
