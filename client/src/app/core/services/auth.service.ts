import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CostumerRegisterRequestDTO } from "@core/interfaces/costumer-register-request-dto";
import { CredentialsRequestDTO } from "@core/interfaces/credentials-request-dto";
import { User } from "@core/interfaces/User";
import { environment as api } from "environments/environment.development";
import { first, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly USER_KEY = "costumer";

  constructor(private http: HttpClient) {}

  login(credentials: CredentialsRequestDTO) {
    return this.http.post(`${api.baseUrl}/api/v1/auth/login`, credentials).pipe(
      first(),
      tap((res) => {
        this.user = res;
      })
    );
  }

  register(value: Partial<CostumerRegisterRequestDTO>) {
    return this.http.post(`${api.baseUrl}/api/v1/auth/register`, value).pipe(
      first(),
      tap((res) => {
        this.user = res;
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  get user(): User {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  set user(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
