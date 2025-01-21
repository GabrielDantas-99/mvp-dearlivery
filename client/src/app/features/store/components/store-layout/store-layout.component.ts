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
  ],
  templateUrl: "./store-layout.component.html",
  styleUrl: "./store-layout.component.css",
})
export class StoreLayoutComponent {
  categories: Category[] = null;
  drawerVisible: boolean = false;
  authDialogVisible: boolean = false;

  constructor(private categoryService: CategoryService) {
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
}
