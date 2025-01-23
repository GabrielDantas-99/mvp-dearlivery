import { Routes } from "@angular/router";
import { OverviewComponent } from "./features/admin/pages/overview/overview.component";
import { ProductListComponent } from "./features/admin/pages/products/product-list/product-list.component";
import { ProductFormComponent } from "@features/admin/pages/products/product-form/product-form.component";
import { StoreCatalogComponent } from "@features/store/pages/store-catalog/store-catalog.component";
import { MyCartComponent } from "@features/store/pages/my-cart/my-cart.component";
import { RegisterComponent } from "@features/auth/pages/register/register.component";
import { authGuard } from "@core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: StoreCatalogComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "overview",
    component: OverviewComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "products",
    component: ProductListComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "products/product-form",
    component: ProductFormComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "products/product-form/:productId",
    component: ProductFormComponent,
    canActivate: [authGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "my-cart",
    component: MyCartComponent,
    canActivate: [authGuard],
    data: { roles: ["COSTUMER"] },
  },
];
