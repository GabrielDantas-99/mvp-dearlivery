import { Component } from "@angular/core";
import { StoreLayoutComponent } from "../../components/store-layout/store-layout.component";
import { PanelModule } from "primeng/panel";
import { CurrencyBrPipe } from "@shared/pipes/currency-br.pipe";
import { ButtonModule } from "primeng/button";
import { OrderService } from "@core/services/order.service";
import { Order } from "@core/interfaces/order";
import { CheckboxModule } from "primeng/checkbox";
import { NgFor } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderItem } from "@core/interfaces/order-item";
import { MenuModule } from "primeng/menu";
import { Product } from "@core/interfaces/product";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-cart",
  imports: [
    StoreLayoutComponent,
    PanelModule,
    CurrencyBrPipe,
    ButtonModule,
    CheckboxModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
  ],
  templateUrl: "./my-cart.component.html",
  styleUrl: "./my-cart.component.css",
})
export class MyCartComponent {
  items: OrderItem[] = [];
  order: Order = {
    items: [],
    moment: null,
    payment: null,
    total: null,
    orderStatus: null,
  };

  quantitiesPerItem = [];

  value = 0;

  constructor(private orderService: OrderService, private router: Router) {
    this.order = this.orderService.getCart();
  }

  finalizeOrder() {
    this.orderService.create().subscribe({
      next: (res) => {
        this.router.navigate(["order-success"]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  incriaseItem(product: Product) {
    this.orderService.addToCart(product);
  }

  decrementFromCart(item: OrderItem) {
    this.orderService.decrementFromCart(item.product);
    this.order = this.orderService.getCart();
  }

  getQuantity(index: number) {
    return this.orderService.getItemQuantity(index);
  }

  getSubTotal(index: number): number {
    return this.orderService.getItemSubTotal(index);
  }

  get total() {
    return this.orderService.getOrder().total;
  }
}
