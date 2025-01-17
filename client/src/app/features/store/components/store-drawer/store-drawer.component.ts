import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { DrawerModule } from "primeng/drawer";
import { ButtonModule } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { AvatarModule } from "primeng/avatar";
import { StyleClass } from "primeng/styleclass";
import { Drawer } from "primeng/drawer";
import { CategoryService } from "@core/services/category.service";
import { Category } from "@core/interfaces/category";
import { NgFor } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-store-drawer",
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    NgFor,
    RouterLink,
  ],
  providers: [CategoryService],
  templateUrl: "./store-drawer.component.html",
  styleUrl: "./store-drawer.component.css",
})
export class StoreDrawerComponent {
  @ViewChild("drawerRef") drawerRef!: Drawer;
  @Input() visible: boolean = false;
  @Output() toggleDrawer = new EventEmitter();
  @Input() categories: Category[] = null;

  closeCallback(e): void {
    this.drawerRef.close(e);
    this.toggleDrawer.emit();
  }
}
