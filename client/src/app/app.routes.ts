import { Routes } from "@angular/router";
import { OverviewComponent } from "./features/admin/pages/overview/overview.component";

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
];
