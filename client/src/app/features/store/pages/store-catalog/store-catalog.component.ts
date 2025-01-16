import { Component } from "@angular/core";
import { StoreLayoutComponent } from "@features/store/components/store-layout/store-layout.component";

@Component({
  selector: "app-store-catalog",
  imports: [StoreLayoutComponent],
  templateUrl: "./store-catalog.component.html",
  styleUrl: "./store-catalog.component.css",
})
export class StoreCatalogComponent {}
