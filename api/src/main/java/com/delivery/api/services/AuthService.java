package com.delivery.api.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.delivery.api.config.JwtService;
import com.delivery.api.domain.dtos.request.CostumerRegisterRequestDTO;
import com.delivery.api.domain.dtos.request.CredentialsRequestDTO;
import com.delivery.api.domain.dtos.response.CostumerAuthenticationResponseDTO;
import com.delivery.api.domain.entities.User;
import com.delivery.api.domain.enums.Role;
import com.delivery.api.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public CostumerAuthenticationResponseDTO costumerRegister(CostumerRegisterRequestDTO request) {
    User user = User.builder()
        .name(request.name())
        .email(request.email())
        .password(passwordEncoder.encode(request.password()))
        .phone(request.phone())
        .role(Role.COSTUMER)
        .build();
    userRepository.save(user);
    var jwtToken = jwtService.generateToken(user);
    return CostumerAuthenticationResponseDTO.builder()
        .name(user.getName())
        .email(user.getEmail())
        .role(user.getRole())
        .accessToken(jwtToken)
        .build();
  }

  public CostumerAuthenticationResponseDTO login(CredentialsRequestDTO request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.user(),
            request.password()));
    var user = userRepository.findByEmail(request.user())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    return CostumerAuthenticationResponseDTO.builder()
        .accessToken(jwtToken)
        .email(user.getEmail())
        .name(user.getName())
        .role(user.getRole())
        .build();
  }
}
