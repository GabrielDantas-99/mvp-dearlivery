package com.delivery.api.entities.dtos.request;

import lombok.Builder;

@Builder
public record CostumerRegisterRequestDTO(
    String name,
    String email,
    String password,
    String phone) {
}
