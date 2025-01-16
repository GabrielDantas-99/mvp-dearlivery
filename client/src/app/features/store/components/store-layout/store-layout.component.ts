import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Toolbar } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { StoreDrawerComponent } from "../store-drawer/store-drawer.component";
import { BadgeModule } from "primeng/badge";

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
  items: MenuItem[] | undefined;
  visible: boolean = true;

  ngOnInit() {
    this.items = [
      {
        label: "Update",
        icon: "pi pi-refresh",
      },
      {
        label: "Delete",
        icon: "pi pi-times",
      },
    ];
  }

  toggleDrawer(e) {
    this.visible = !this.visible;
  }
}
