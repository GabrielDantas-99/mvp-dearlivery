package com.delivery.api.domain.dtos.response;

import com.delivery.api.domain.entities.User;
import com.delivery.api.domain.enums.Role;

public record ClientDTO(
        Long id,
        String name,
        String email,
        String phone,
        String cpf,
        Role role) {
    public ClientDTO(User user) {
        this(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getCpf(),
                user.getRole());
    }
}
