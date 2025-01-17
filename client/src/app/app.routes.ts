import { Routes } from "@angular/router";
import { OverviewComponent } from "./features/admin/pages/overview/overview.component";
import { ProductListComponent } from "./features/admin/pages/products/product-list/product-list.component";
import { ProductFormComponent } from "@features/admin/pages/products/product-form/product-form.component";
import { StoreCatalogComponent } from "@features/store/pages/store-catalog/store-catalog.component";
import { MyCartComponent } from "@features/store/pages/my-cart/my-cart.component";

export const routes: Routes = [
  {
    path: "",
    component: StoreCatalogComponent,
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
  {
    path: "my-cart",
    component: MyCartComponent,
  },
];
