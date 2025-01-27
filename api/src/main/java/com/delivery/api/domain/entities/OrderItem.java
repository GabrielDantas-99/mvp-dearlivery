package com.delivery.api.domain.entities;

import java.io.Serializable;

import com.delivery.api.domain.pk.OrderItemPK;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tb_order_item")
public class OrderItem implements Serializable {
  private static final long serialVersionUID = 1L;

  @EmbeddedId
  private OrderItemPK id = new OrderItemPK();

  @Getter
  @Setter
  private Integer quantity;

  @Getter
  @Setter
  private Double price;

  public OrderItem(Order order, Product product, Integer quantity, Double price) {
    id.setOrder(order);
    id.setProduct(product);
    this.quantity = quantity;
    this.price = price;
  }

  @JsonIgnore
  public Order getOrder() {
    return id.getOrder();
  }

  public void setOrder(Order order) {
    id.setOrder(order);
  }

  public Product getProduct() {
    return id.getProduct();
  }

  public void setProduct(Product product) {
    id.setProduct(product);
  }

  public Double getSubTotal() {
    return price * quantity;
  }

}
