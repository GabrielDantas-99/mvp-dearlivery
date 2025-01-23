import { Component, Input, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MenuModule } from "primeng/menu";
import { BadgeModule } from "primeng/badge";
import { RippleModule } from "primeng/ripple";
import { AvatarModule } from "primeng/avatar";
import { NgClass, NgIf } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { toggleDarkMode } from "../../../../app.component";
import { ToggleSwitch } from "primeng/toggleswitch";
import { FormsModule } from "@angular/forms";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { MENU_ITEMS } from "../../const/menu-itens";
import { RouterLink } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: "app-admin-layout",
  imports: [
    MenuModule,
    ButtonModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    NgIf,
    FormsModule,
    ToggleSwitch,
    NgClass,
    BreadcrumbModule,
    RouterLink,
  ],
  templateUrl: "./admin-layout.component.html",
  styleUrl: "./admin-layout.component.css",
})
export class AdminLayoutComponent implements OnInit {
  @Input() breadcrumbs: MenuItem[] | undefined;

  items: MenuItem[] | undefined;
  checked: boolean = false;
  home: MenuItem | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.home = { icon: "pi pi-home", routerLink: "/" };
    this.items = MENU_ITEMS;
  }

  toggleDarkMode() {
    this.checked = !this.checked;
    toggleDarkMode();
  }

  logout() {
    this.authService.logout();
  }
}
