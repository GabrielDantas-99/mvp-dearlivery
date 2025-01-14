import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PrimeNG } from "primeng/config";
import { Noir } from "./theme/mypreset";
@Component({
  selector: "app-root",
  imports: [ButtonModule],
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
    const element = document.querySelector("html");
    element.classList.toggle("my-app-dark");
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
