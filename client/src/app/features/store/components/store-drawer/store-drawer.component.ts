import {
  Component,
  EventEmitter,
  Input,
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
import { Observable } from "rxjs";
import { AsyncPipe, NgFor } from "@angular/common";

@Component({
  selector: "app-store-drawer",
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: "./store-drawer.component.html",
  styleUrl: "./store-drawer.component.css",
})
export class StoreDrawerComponent {
  @ViewChild("drawerRef") drawerRef!: Drawer;
  @Input() visible: boolean = false;
  @Output() toggleDrawer = new EventEmitter();

  categories: Observable<Category[]> = null;

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.findAll();
  }

  closeCallback(e): void {
    this.drawerRef.close(e);
    this.toggleDrawer.emit();
  }
}
