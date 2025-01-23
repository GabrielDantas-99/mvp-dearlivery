package com.delivery.api.resources;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.delivery.api.entities.domain.Order;
import com.delivery.api.services.OrderService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderResource {

  private final OrderService orderService;

  @GetMapping
  @PreAuthorize("hasAnyRole('COSTUMER','ADMIN')")
  public ResponseEntity<List<Order>> findAll() {
    List<Order> list = orderService.findAll();
    return ResponseEntity.ok().body(list);
  }

  @GetMapping("/{orderId}")
  @PreAuthorize("hasAnyRole('COSTUMER','ADMIN')")
  public ResponseEntity<Order> findById(@PathVariable Long orderId) {
    Order order = orderService.findById(orderId);
    return ResponseEntity.ok().body(order);
  }

  @PostMapping
  @PreAuthorize("hasAnyRole('COSTUMER')")
  public ResponseEntity<Order> create(@RequestBody Order orderDto) {
    Order newOrder = orderService.create(orderDto);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(newOrder.getId()).toUri();
    return ResponseEntity.created(uri).body(newOrder);
  }

  @PatchMapping("/{orderId}/status")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<Order> updateOrderStatus(
      @PathVariable Long orderId,
      @RequestBody Map<String, Integer> request) {
    Integer statusCode = request.get("status");
    if (statusCode == null) {
      return ResponseEntity.badRequest().build();
    }
    Order updatedOrder = orderService.updateOrderStatus(orderId, statusCode);
    return ResponseEntity.ok().body(updatedOrder);
  }

}
