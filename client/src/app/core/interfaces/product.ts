import { Category } from "./category";

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  imgUrl?: string;
  inStock?: number;
  storeId?: number;
  price?: number;
  categories?: Category[];
}
