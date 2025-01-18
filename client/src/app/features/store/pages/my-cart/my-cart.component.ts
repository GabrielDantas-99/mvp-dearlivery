import { Component } from "@angular/core";
import { StoreLayoutComponent } from "../../components/store-layout/store-layout.component";
import { PanelModule } from "primeng/panel";
import { CurrencyBrPipe } from "@shared/pipes/currency-br.pipe";
import { ButtonModule } from "primeng/button";
import { OrderService } from "@core/services/order.service";
import { Order } from "@core/interfaces/order";
import { CheckboxModule } from "primeng/checkbox";
import { NgFor } from "@angular/common";
import { InputNumber } from "primeng/inputnumber";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderItem } from "@core/interfaces/order-item";
import { MenuModule } from "primeng/menu";
import { Product } from "@core/interfaces/product";

@Component({
  selector: "app-my-cart",
  imports: [
    StoreLayoutComponent,
    PanelModule,
    CurrencyBrPipe,
    ButtonModule,
    CheckboxModule,
    NgFor,
    InputNumber,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
  ],
  templateUrl: "./my-cart.component.html",
  styleUrl: "./my-cart.component.css",
})
export class MyCartComponent {
  order: Order = {
    items: [],
    moment: null,
    payment: null,
    total: null,
    orderStatus: null,
  };

  quantitiesPerItem = [];

  value = 0;

  constructor(private orderService: OrderService) {
    this.order = this.orderService.getCart();
    // this.order.items.forEach((item) => {
    //   this.quantitiesPerItem.push(item.quantity);
    // });
  }

  saveOrder() {
    let items: OrderItem[] = [];
    this.order.items.forEach((item, i) => {
      items.push({
        ...item,
        quantity: this.quantitiesPerItem[i],
        subTotal: this.quantitiesPerItem[i] * item.price,
      });
    });
    items.map((i) => (this.order.total += i.subTotal));
    this.order = {
      ...this.order,
      items: items,
    };
    this.orderService.saveCart(this.order);
  }

  incriaseItem(product: Product) {
    this.orderService.addToCart(product);
  }

  decrementFromCart(item: OrderItem, index: number) {
    if (item.quantity === 1) {
      this.order.items = this.order.items.slice(0, index);
    }
    this.orderService.decrementFromCart(item.product);
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
