import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CostumerRegisterRequestDTO } from "@core/interfaces/costumer-register-request-dto";
import { CredentialsRequestDTO } from "@core/interfaces/credentials-request-dto";
import { LoginResponse } from "@core/interfaces/login-response.dto";
import { User } from "@core/interfaces/user";
import { environment as api } from "environments/environment.development";
import { first, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly USER_KEY = "USER_KEY";
  private readonly TOKEN_KEY = "TOKEN_KEY";

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: CredentialsRequestDTO) {
    return this.http.post(`${api.baseUrl}/api/v1/auth/login`, credentials).pipe(
      first(),
      tap((res: LoginResponse) => {
        this.user = { name: res.name, email: res.email, role: res.role };
        this.token = res.access_token;
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
    this.router.navigate(["/"]);
  }

  get user(): User {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  set user(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  get token() {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }

  set token(token) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }
}
