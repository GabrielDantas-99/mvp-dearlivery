import { Product } from "./product";

export interface OrderItem {
  quantity?: number;
  price?: number;
  subTotal?: number;
  product?: Product;
}
