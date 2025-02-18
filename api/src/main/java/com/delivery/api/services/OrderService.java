package com.delivery.api.services;

import static com.delivery.api.domain.enums.OrderStatus.WAITING_PAYMENT;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.delivery.api.domain.dtos.request.OrderItemRequestDTO;
import com.delivery.api.domain.dtos.request.OrderRequestDTO;
import com.delivery.api.domain.dtos.response.OrderResponseDTO;
import com.delivery.api.domain.entities.Order;
import com.delivery.api.domain.entities.OrderItem;
import com.delivery.api.domain.entities.Product;
import com.delivery.api.domain.entities.User;
import com.delivery.api.domain.enums.OrderStatus;
import com.delivery.api.repositories.OrderItemRepository;
import com.delivery.api.repositories.OrderRepository;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;
  private final UserService userService;
  private final ProductService productService;
  private final OrderItemRepository orderItemRepository;

  public List<Order> findAll() {
    List<Order> list = orderRepository.findAll();
    return list;
  }

  public Order findById(Long orderId) {
    Optional<Order> order = orderRepository.findById(orderId);
    return order.orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado!"));
  }

  public OrderResponseDTO create(OrderRequestDTO order) {
    Order entity = orderRepository.save(buildOrder(order));
    return new OrderResponseDTO(entity);
  }

  private Order buildOrder(OrderRequestDTO dto) {
    User user = userService.findByEmail(dto.client());
    Order order = new Order(null, Instant.parse(dto.moment()), WAITING_PAYMENT, user);
    orderRepository.save(order);
    for (OrderItemRequestDTO oiDTO : dto.items()) {
      Product p = productService.findById(oiDTO.productId());
      OrderItem oi = new OrderItem(order, p, oiDTO.quantity(), p.getPrice());
      order.getItems().add(oi);
      orderItemRepository.save(oi);
    }
    orderRepository.save(order);
    return order;
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
