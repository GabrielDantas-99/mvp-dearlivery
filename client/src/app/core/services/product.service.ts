import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "@core/interfaces/product";
import { first, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  findAllByStoreId() {
    const storeId = this.authService.store.id;
    return this.http
      .get<Product[]>(`http://localhost:8080/products/store/${storeId}`)
      .pipe(first());
  }

  findById(productId: number) {
    const storeId = this.authService.store.id;
    return this.http
      .get<Product>(
        `http://localhost:8080/products?storeId=${storeId}&productId=${productId}`
      )
      .pipe(first());
  }

  registerProduct(product: Partial<Product>) {
    return this.http
      .post<Product[]>(`http://localhost:8080/products`, product)
      .pipe(first());
  }

  updateProduct(product: Partial<Product>) {
    return this.http
      .put<Product>(`http://localhost:8080/products`, product)
      .pipe(first());
  }

  delete(productId: number) {
    const storeId = this.authService.store.id;
    return this.http
      .delete(
        `http://localhost:8080/products?storeId=${storeId}&productId=${productId}`
      )
      .pipe(first());
  }
}
