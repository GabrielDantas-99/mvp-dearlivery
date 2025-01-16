import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Toolbar } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { StoreDrawerComponent } from "../store-drawer/store-drawer.component";
import { BadgeModule } from "primeng/badge";
import { CategoryService } from "@core/services/category.service";
import { Category } from "@core/interfaces/category";
import { tap } from "rxjs";

@Component({
  selector: "app-store-layout",
  imports: [
    Toolbar,
    ButtonModule,
    InputTextModule,
    StoreDrawerComponent,
    BadgeModule,
  ],
  templateUrl: "./store-layout.component.html",
  styleUrl: "./store-layout.component.css",
})
export class StoreLayoutComponent {
  visible: boolean = false;
  categories: Category[] = null;

  constructor(private categoryService: CategoryService) {
    this.categoryService.findAll().subscribe((res) => (this.categories = res));
  }

  toggleDrawer(e) {
    this.visible = !this.visible;
  }
}
