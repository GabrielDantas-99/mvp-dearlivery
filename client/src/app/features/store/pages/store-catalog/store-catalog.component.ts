import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { Category } from "@core/interfaces/category";
import { Product } from "@core/interfaces/product";
import { CategoryService } from "@core/services/category.service";
import { ProductService } from "@core/services/product.service";
import { StoreLayoutComponent } from "@features/store/components/store-layout/store-layout.component";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { Chip } from "primeng/chip";
import { Rating } from "primeng/rating";
import { FormsModule } from "@angular/forms";
import { CurrencyBrPipe } from "../../../../shared/pipes/currency-br.pipe";
import { OrderService } from "@core/services/order.service";
import { AuthService } from "@core/services/auth.service";
import { AuthDialogComponent } from "@features/auth/components/auth-dialog/auth-dialog.component";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-store-catalog",
  imports: [
    StoreLayoutComponent,
    NgFor,
    ButtonModule,
    PanelModule,
    FormsModule,
    Chip,
    Rating,
    CurrencyBrPipe,
    AuthDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: "./store-catalog.component.html",
  styleUrl: "./store-catalog.component.css",
})
export class StoreCatalogComponent {
  categories: Category[] = null;
  products: Product[] = null;
  activeCategory: number = 0;
  rating: number[] = [];
  authDialogVisible: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.categoryService.findAll().subscribe((res) => (this.categories = res));
    this.productService.findAll().subscribe((res) => {
      this.products = res;
      this.generateRandomRatings(res);
    });
  }

  generateRandomRatings(res) {
    for (let i = 0; i < res.length; i++) {
      this.rating.push(Math.random() * (5 - 3) + 3);
    }
  }

  getCategoryLabel(cats: Category[]) {
    return cats.length > 1 ? `${cats[0].name} +${cats.length}` : cats[0].name;
  }

  addToCart(product: Product) {
    if (!this.authService.user) {
      this.authDialogVisible = true;
      return;
    }
    this.orderService.addToCart(product);
  }

  closeDialog() {
    this.authDialogVisible = false;
  }
}
