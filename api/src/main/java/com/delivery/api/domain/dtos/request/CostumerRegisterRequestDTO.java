package com.delivery.api.domain.dtos.request;

import lombok.Builder;

@Builder
public record CostumerRegisterRequestDTO(
        String name,
        String email,
        String password,
        String phone) {
}
