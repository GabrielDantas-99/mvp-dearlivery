import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PrimeNG } from "primeng/config";
import { Noir } from "./theme/mypreset";
import { RouterOutlet } from "@angular/router";
@Component({
  selector: "app-root",
  imports: [ButtonModule, RouterOutlet],
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  title = "client";

  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: Noir,
      options: {
        cssLayer: {
          name: "primeng",
          order: "tailwind-base, primeng, tailwind-utilities",
        },
        prefix: "my",
        darkModeSelector: ".my-app-dark",
      },
    });
  }

  toggleDarkMode() {
    toggleDarkMode();
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
export function toggleDarkMode() {
  const element = document.querySelector("html");
  element.classList.toggle("my-app-dark");
}
