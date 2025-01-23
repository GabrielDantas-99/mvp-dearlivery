package com.delivery.api.entities.enums;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static com.delivery.api.entities.enums.Permission.*;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
  ADMIN(
      Set.of(
          ADMIN_READ,
          ADMIN_CREATE,
          ADMIN_UPDATE,
          ADMIN_DELETE,
          COSTUMER_READ,
          COSTUMER_CREATE,
          COSTUMER_UPDATE,
          COSTUMER_DELETE)),
  COSTUMER(
      Set.of(
          COSTUMER_READ,
          COSTUMER_CREATE,
          COSTUMER_UPDATE,
          COSTUMER_DELETE));

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
        .stream()
        .map(permission -> new SimpleGrantedAuthority((permission.getPermission())))
        .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
