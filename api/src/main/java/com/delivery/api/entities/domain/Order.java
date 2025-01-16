package com.delivery.api.entities.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.delivery.api.entities.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_order")
@NoArgsConstructor
public class Order implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @Getter
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Getter
  @Setter
  private Instant moment;
  private Integer orderStatus;

  @Getter
  @Setter
  @ManyToOne
  @JoinColumn(name = "client_id")
  private User client;

  @Getter
  @OneToMany(mappedBy = "id.order")
  private Set<OrderItem> items = new HashSet<>();

  @Getter
  @Setter
  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  private Payment payment;

  public Order(Long id, Instant moment, OrderStatus orderStatus, User client) {
    super();
    this.id = id;
    this.moment = moment;
    this.client = client;
    setOrderStatus(orderStatus);
  }

  public OrderStatus getOrderStatus() {
    return OrderStatus.valueOf(orderStatus);
  }

  public void setOrderStatus(OrderStatus orderStatus) {
    if (orderStatus != null) {
      this.orderStatus = orderStatus.getCode();
    }
  }

  public Double getTotal() {
    double total = 0.0;
    for (OrderItem o : items) {
      total += o.getSubTotal();
    }
    return total;
  }

  @PrePersist
  public void prePersist() {
    if (orderStatus == null) {
      this.orderStatus = OrderStatus.WAITING_PAYMENT.getCode();
    }
  }

}
