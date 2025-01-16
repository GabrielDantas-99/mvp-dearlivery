import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first } from "rxjs";
import { AuthService } from "./auth.service";
import { Category } from "@core/interfaces/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`http://localhost:8080/categories`)
      .pipe(first());
  }
}
