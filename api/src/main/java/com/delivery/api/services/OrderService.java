package com.delivery.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.delivery.api.entities.domain.Order;
import com.delivery.api.entities.enums.OrderStatus;
import com.delivery.api.repositories.OrderRepository;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;

  public List<Order> findAll() {
    List<Order> list = orderRepository.findAll();
    return list;
  }

  public Order findById(Long orderId) {
    Optional<Order> order = orderRepository.findById(orderId);
    return order.orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado!"));
  }

  public Order create(Order order) {
    return orderRepository.save(order);
  }

  public Order updateOrderStatus(Long orderId, Integer statusCode) {
    try {
      Order entity = orderRepository.getReferenceById(orderId);
      OrderStatus newStatus = OrderStatus.valueOf(statusCode);
      entity.setOrderStatus(newStatus);
      return orderRepository.save(entity);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException("Pedido não encontrado para o ID: " + orderId);
    } catch (IllegalArgumentException e) {
      throw new IllegalArgumentException("Status inválido: " + statusCode);
    }
  }

}
