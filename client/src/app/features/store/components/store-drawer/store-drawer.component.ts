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
import { NgClass, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { User } from "@core/interfaces/User";
import { ToggleSwitch } from "primeng/toggleswitch";
import { toggleDarkMode } from "app/app.component";

@Component({
  selector: "app-store-drawer",
  imports: [
    ToggleSwitch,
    DrawerModule,
    ButtonModule,
    AvatarModule,
    RouterLink,
    StyleClass,
    NgClass,
    Ripple,
    NgFor,
    NgIf,
  ],
  providers: [CategoryService],
  templateUrl: "./store-drawer.component.html",
  styleUrl: "./store-drawer.component.css",
})
export class StoreDrawerComponent {
  @ViewChild("drawerRef") drawerRef!: Drawer;
  @Input() drawerVisible: boolean = false;
  @Input() categories: Category[] = null;
  @Input() user: User = null;
  @Output() toggleDrawer = new EventEmitter();
  @Output() showAuthDialog = new EventEmitter();
  // {
  //   name: "Amy Lee",
  //   email: "amy.lee@hotmail.com",
  //   imgUrl:
  //     "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // };
  checked: boolean = false;

  credentials: any = {
    user: null,
    password: null,
  };
  showDialog: boolean;

  closeCallback(e): void {
    this.drawerRef.close(e);
    this.toggleDrawer.emit();
  }

  toggleDarkMode() {
    this.checked = !this.checked;
    toggleDarkMode();
  }

  _showAuthDialog() {
    this.showAuthDialog.emit();
  }
}
