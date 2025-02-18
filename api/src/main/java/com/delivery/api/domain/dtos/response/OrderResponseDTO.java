package com.delivery.api.domain.dtos.response;

import java.util.Set;
import java.util.stream.Collectors;

import com.delivery.api.domain.entities.Order;

public record OrderResponseDTO(
                Long id,
                String moment,
                String orderStatus,
                ClientDTO client,
                Set<OrderItemResponseDTO> items,
                String paymentMoment) {
        public OrderResponseDTO(Order order) {
                this(
                                order.getId(),
                                order.getMoment().toString(),
                                order.getOrderStatus().toString(),
                                new ClientDTO(order.getClient()),
                                order.getItems().stream()
                                                .map(OrderItemResponseDTO::new)
                                                .collect(Collectors.toSet()),
                                order.getPayment() != null ? order.getPayment().getMoment().toString() : null);
        }

}
