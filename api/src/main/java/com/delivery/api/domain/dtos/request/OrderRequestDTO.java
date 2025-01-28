package com.delivery.api.domain.dtos.request;

import java.util.List;

public record OrderRequestDTO(
        List<OrderItemRequestDTO> items,
        String moment,
        String client) {
}
