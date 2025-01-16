import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  get store() {
    return {
      id: 1,
    };
  }
}
