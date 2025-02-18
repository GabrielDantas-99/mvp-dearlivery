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

  ngOnInit() {
    this.primeng.ripple.set(true);
    initializeTheme();
  }
}

const DARK_MODE_KEY = "my-app-dark";

export function toggleDarkMode(): void {
  const element = document.querySelector("html");
  const classList = element.classList;
  const isDarkMode = classList.toggle(DARK_MODE_KEY);
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
}

export function initializeTheme(): void {
  const isDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY) || "false");
  const element = document.querySelector("html");
  const classList = element.classList;
  isDarkMode ? classList.add(DARK_MODE_KEY) : classList.remove(DARK_MODE_KEY);
}
