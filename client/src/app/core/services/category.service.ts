import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, first } from "rxjs";
import { Category } from "@core/interfaces/category";
import { environment as api } from "environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categories: Category[];
  constructor(private http: HttpClient) {}

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${api.baseUrl}/categories`);
  }
}
