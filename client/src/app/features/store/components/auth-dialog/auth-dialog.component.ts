import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { NgIf } from "@angular/common";
import { Message } from "primeng/message";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-auth-dialog",
  imports: [
    Dialog,
    PasswordModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    NgIf,
    Message,
  ],
  providers: [MessageService],
  templateUrl: "./auth-dialog.component.html",
  styleUrl: "./auth-dialog.component.css",
})
export class AuthDialogComponent {
  @Input() authDialogVisible: boolean;
  @Input() showContinueWithLogin: boolean = false;
  @Output() closeDialog = new EventEmitter();
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toast: MessageService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.showContinueWithLogin = true;
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this._closeDialog();
        this.loginForm.reset();
        if (this.authService.user.role === "ADMIN") {
          this.router.navigate(["/overview"]);
        }
        if (this.authService.user.role === "COSTUMER") {
          this.router.navigate(["/"]);
        }
        this.toast.add({
          severity: "success",
          summary: "Bem-vindo(a), novamente!",
        });
      },
      error: (err) => {
        this._closeDialog();
        this.loginForm.reset();
        this.toast.add({
          severity: "error",
          summary: "Opss...",
          detail: "Credenciais inválidas!",
        });
      },
    });
  }

  _closeDialog() {
    this.closeDialog.emit();
  }
}
