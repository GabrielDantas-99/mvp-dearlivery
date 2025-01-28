package com.delivery.api.domain.dtos.request;

import lombok.Builder;

@Builder
public record CredentialsRequestDTO(
        String user,
        String password) {
}
