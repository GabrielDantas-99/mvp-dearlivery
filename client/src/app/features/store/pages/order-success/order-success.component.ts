import { Component } from "@angular/core";
import { StoreLayoutComponent } from "../../components/store-layout/store-layout.component";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-order-success",
  imports: [StoreLayoutComponent, ButtonModule, RouterLink],
  templateUrl: "./order-success.component.html",
  styleUrl: "./order-success.component.css",
})
export class OrderSuccessComponent {}
