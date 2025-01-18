import { Injectable } from "@angular/core";
import { Order } from "@core/interfaces/order";
import { OrderItem } from "@core/interfaces/order-item";
import { Product } from "@core/interfaces/product";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly CART_KEY = "meu_carrinho";

  constructor() {}

  saveCart(cart: Order) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCart(): Order {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
  }

  getOrder(): Order {
    return this.getCart();
  }

  addToCart(product: Product, quantity: number = 1) {
    const cart = this.getCart();
    let existingItemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex];
      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        subTotal: this.roundToFour(
          (existingItem.quantity + quantity) * product.price
        ),
      };
    } else {
      cart.items.push({
        product,
        quantity,
        subTotal: this.roundToFour(quantity * product.price),
      });
    }
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    console.log(this.getOrder());
  }

  decrementFromCart(product: Product) {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingItemIndex === -1) return;
    const item = cart.items[existingItemIndex];
    if (item.quantity === 1) {
      cart.items.splice(existingItemIndex, 1);
    } else {
      item.quantity -= 1;
      item.subTotal = this.roundToFour(item.quantity * item.product.price);
    }
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
  }

  private calculateTotal(items: OrderItem[]): number {
    return this.roundToFour(
      items.reduce((total, item) => total + item.subTotal, 0)
    );
  }

  roundToFour(value: number): number {
    return Math.round(value * 10000) / 10000;
  }

  getItemQuantity(index: number) {
    return this.getOrder().items[index].quantity;
  }

  getItemSubTotal(index: number): number {
    return this.getOrder().items[index].subTotal;
  }
}
