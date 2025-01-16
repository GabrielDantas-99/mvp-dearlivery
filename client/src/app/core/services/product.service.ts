import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "@core/interfaces/product";
import { environment as api } from "environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Product[]>(`${api.baseUrl}/products`);
  }

  findById(productId: number) {
    return this.http.get<Product>(`${api.baseUrl}/products/${productId}`);
  }

  create(product: Partial<Product>) {
    return this.http.post<Product[]>(`${api.baseUrl}/products`, product);
  }

  update(product: Partial<Product>) {
    return this.http.put<Product>(`${api.baseUrl}/products`, product);
  }

  delete(productId: number) {
    return this.http.delete(`${api.baseUrl}/products/${productId}`);
  }
}
