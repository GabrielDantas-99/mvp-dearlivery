package com.delivery.api.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.delivery.api.domain.dtos.request.CostumerRegisterRequestDTO;
import com.delivery.api.domain.dtos.request.CredentialsRequestDTO;
import com.delivery.api.domain.dtos.response.CostumerAuthenticationResponseDTO;
import com.delivery.api.services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthResource {
  private final AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<CostumerAuthenticationResponseDTO> costumerRegister(
      @RequestBody CostumerRegisterRequestDTO request) {
    return ResponseEntity.ok(authService.costumerRegister(request));
  }

  @PostMapping("/login")
  public ResponseEntity<CostumerAuthenticationResponseDTO> login(
      @RequestBody CredentialsRequestDTO request) {
    return ResponseEntity.ok(authService.login(request));
  }

}
