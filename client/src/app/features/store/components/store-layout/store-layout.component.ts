import { Component, Input } from "@angular/core";
import { Toolbar } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { StoreDrawerComponent } from "../store-drawer/store-drawer.component";
import { BadgeModule } from "primeng/badge";
import { CategoryService } from "@core/services/category.service";
import { Category } from "@core/interfaces/category";
import { RouterLink } from "@angular/router";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";
import { OrderService } from "@core/services/order.service";
import { AuthService } from "@core/services/auth.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-store-layout",
  imports: [
    Toolbar,
    ButtonModule,
    InputTextModule,
    StoreDrawerComponent,
    BadgeModule,
    RouterLink,
    PasswordModule,
    DividerModule,
    AuthDialogComponent,
    NgIf,
  ],
  templateUrl: "./store-layout.component.html",
  styleUrl: "./store-layout.component.css",
})
export class StoreLayoutComponent {
  categories: Category[] = null;
  drawerVisible: boolean = false;
  authDialogVisible: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.categoryService.findAll().subscribe((res) => (this.categories = res));
  }

  toggleDrawer(e?) {
    this.drawerVisible = !this.drawerVisible;
  }

  showAuthDialog() {
    this.drawerVisible = false;
    this.authDialogVisible = true;
  }

  closeDialog() {
    this.authDialogVisible = false;
  }

  get cartItems() {
    let cartItems = 0;
    this.orderService.getOrder().items.forEach((item) => {
      cartItems += item.quantity;
    });
    return cartItems;
  }

  get user() {
    return this.authService.user;
  }
}
