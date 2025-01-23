package com.delivery.api.entities.dtos.response;

import com.delivery.api.entities.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CostumerAuthenticationResponseDTO(
        String name,
        String email,
        Role role,
        @JsonProperty("access_token") String accessToken) {
}
