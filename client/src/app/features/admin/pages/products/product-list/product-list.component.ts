import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Product } from "@core/interfaces/product";
import { ProductService } from "@core/services/product.service";
import { AdminLayoutComponent } from "@features/admin/components/admin-layout/admin-layout.component";
import { CurrencyBrPipe } from "@shared/pipes/currency-br.pipe";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
@Component({
  selector: "app-product-list",
  imports: [
    AdminLayoutComponent,
    IconFieldModule,
    InputIconModule,
    TagModule,
    CurrencyBrPipe,
    ButtonModule,
    RouterLink,
    TableModule,
    InputTextModule,
    NgIf,
  ],
  providers: [ProductService],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent {
  products: Product[] = null;
  loading: boolean = true;

  constructor(private productService: ProductService) {
    this.productService.findAll().subscribe((value) => {
      this.products = value;
      this.loading = false;
    });

    console.log(this.products);
  }

  getTargetValue(event: any): any {
    return event.target.value as EventTarget;
  }
}
