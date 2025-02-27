package com.delivery.api.resources;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.delivery.api.domain.entities.User;
import com.delivery.api.services.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource {

  private final UserService userService;

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<List<User>> findAll() {
    List<User> list = userService.findAll();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping(value = "/{id}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<User> findById(@PathVariable Long id) {
    User obj = userService.findById(id);
    return ResponseEntity.ok().body(obj);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<User> create(@RequestBody User obj) {
    obj = userService.create(obj);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(obj.getId()).toUri();
    return ResponseEntity.created(uri).body(obj);
  }

  @DeleteMapping(value = "/{id}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping(value = "/{id}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User obj) {
    obj = userService.update(id, obj);
    return ResponseEntity.ok().body(obj);
  }

}
