import { Routes } from "@angular/router";
import { OverviewComponent } from "./features/admin/pages/overview/overview.component";
import { ProductListComponent } from "./features/admin/pages/products/product-list/product-list.component";
import { ProductFormComponent } from "@features/admin/pages/products/product-form/product-form.component";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "overview",
  },
  {
    path: "overview",
    component: OverviewComponent,
  },
  {
    path: "products",
    component: ProductListComponent,
  },
  {
    path: "products/product-form",
    component: ProductFormComponent,
  },
  {
    path: "products/product-form/:productId",
    component: ProductFormComponent,
  },
];
