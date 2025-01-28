import { Component, inject, Input, ViewChild } from "@angular/core";
import { Popover } from "primeng/popover";
import { PopoverModule } from "primeng/popover";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { AvatarModule } from "primeng/avatar";
import { User } from "@core/interfaces/user";
import { AuthService } from "@core/services/auth.service";
import { ToggleSwitch } from "primeng/toggleswitch";
import { toggleDarkMode } from "app/app.component";
@Component({
  selector: "app-user-menu",
  imports: [
    ToggleSwitch,
    PopoverModule,
    ButtonModule,
    CommonModule,
    AvatarModule,
  ],
  templateUrl: "./user-menu.component.html",
  styleUrl: "./user-menu.component.css",
})
export class UserMenuComponent {
  @ViewChild("usermenu") usermenu!: Popover;
  @Input() user: User = null;
  authService = inject(AuthService);

  getUserName(name: string) {
    const names = name.split(" ");
    return names[0] + " " + names[1];
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    toggleDarkMode();
  }
}
