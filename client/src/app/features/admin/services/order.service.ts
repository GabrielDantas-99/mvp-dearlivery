import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../../../core/interfaces/order";
import { delay, first, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) {}

  findByStoreId(): Observable<Order[]> {
    return this.http
      .get<Order[]>("http://localhost:8080/orders")
      .pipe(delay(2000), first());
  }
}
