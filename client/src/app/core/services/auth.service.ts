import { Injectable } from "@angular/core";
import { User } from "@core/interfaces/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly USER_KEY = "costumer";

  constructor() {}

  get user(): User {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
