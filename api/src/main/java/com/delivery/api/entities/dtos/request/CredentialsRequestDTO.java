package com.delivery.api.entities.dtos.request;

import lombok.Builder;

@Builder
public record CredentialsRequestDTO(
    String user,
    String password) {
}
