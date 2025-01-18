package com.delivery.api.entities.domain;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product implements Serializable {
  private static final long serialVersionUID = 1L;

  @Id
  @Getter
  @Setter
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Getter
  @Setter
  private String title;

  @Getter
  @Setter
  private String description;

  @Getter
  @Setter
  private String imgUrl;

  @Getter
  @Setter
  private int inStock;

  @Getter
  @Setter
  private Double price;

  @OneToMany(mappedBy = "id.product")
  private final Set<OrderItem> items = new HashSet<>();

  @Getter
  @ManyToMany
  @JoinTable(name = "tb_product_category", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
  private final Set<Category> categories = new HashSet<>();

  @JsonIgnore
  public Set<Order> getOrders() {
    Set<Order> orders = new HashSet<>();
    for (OrderItem order : items) {
      orders.add(order.getOrder());
    }
    return orders;
  }

}
