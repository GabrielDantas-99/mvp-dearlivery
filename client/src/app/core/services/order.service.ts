import { Injectable } from "@angular/core";
import { Order } from "@core/interfaces/order";
import { Product } from "@core/interfaces/product";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  cart: Order = {
    id: 1,
    moment: new Date().toISOString(),
    orderStatus: null,
    client: {
      id: 1,
      name: "Benedita Malu Clarice da Conceição",
      email: "maria@gmail.com",
      phone: "(91) 99379-7980",
      cpf: "186.425.996-50",
    },
    items: [
      {
        quantity: 2,
        price: 129.0,
        subTotal: 258.0,
        product: {
          id: 1,
          title: "Rede de Dormir Solteiro",
          description: "Rede de algodão 100% com design tradicional",
          imgUrl:
            "https://m.media-amazon.com/images/I/51OcLQzADOL._AC_UL320_.jpg",
          inStock: 20,
          price: 129.0,
          categories: [
            {
              id: 1,
              name: "Redes",
            },
          ],
        },
      },
      {
        quantity: 1,
        price: 189.9,
        subTotal: 189.9,
        product: {
          id: 2,
          title: "Rede de Dormir Casal",
          description: "Rede extra-larga para maior conforto",
          imgUrl:
            "https://m.media-amazon.com/images/I/81g8Gqy+1WL._AC_UL320_.jpg",
          inStock: 15,
          price: 189.9,
          categories: [
            {
              id: 1,
              name: "Redes",
            },
          ],
        },
      },
    ],
    payment: null,
    total: 447.9,
  };

  constructor() {}

  saveCart(order?) {
    this.cart = order;
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getCart(): Order {
    return JSON.parse(localStorage.getItem("cart"));
  }

  addToCart(product: Product) {
    let foundIndex = -1;
    this.cart.items.forEach((item, index) => {
      if (item.product.id === product.id) {
        foundIndex = index;
      }
    });
    if (foundIndex !== -1) {
      this.updateOrderItem(product, foundIndex);
    } else {
      this.newOrderItem(product);
    }
    this.updateCartTotal();
  }

  newOrderItem(product: Product) {
    this.cart.items.push({
      price: product.price,
      product: product,
      quantity: 1,
      subTotal: this.roundToFour(product.price),
    });
  }

  updateOrderItem(product: Product, index: number) {
    const item = this.cart.items[index];
    const newQuantity = item.quantity + 1;
    this.cart.items[index] = {
      ...item,
      quantity: newQuantity,
      subTotal: this.roundToFour(newQuantity * product.price),
    };
  }

  updateCartTotal() {
    this.cart.total = this.roundToFour(
      this.cart.items.reduce((total, item) => total + item.subTotal, 0)
    );
    this.saveCart();
  }

  roundToFour(value: number): number {
    return Math.round(value * 10000) / 10000;
  }
}
