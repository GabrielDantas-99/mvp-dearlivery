package com.delivery.api.entities.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

  ADMIN_CREATE("admin:create"),
  ADMIN_READ("admin:read"),
  ADMIN_UPDATE("admin:update"),
  ADMIN_DELETE("admin:delete"),

  COSTUMER_CREATE("costumer:create"),
  COSTUMER_READ("costumer:read"),
  COSTUMER_UPDATE("costumer:update"),
  COSTUMER_DELETE("costumer:delete");

  @Getter
  private final String permission;

}
