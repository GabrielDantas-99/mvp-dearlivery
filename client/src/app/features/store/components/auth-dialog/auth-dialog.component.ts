import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";

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
  ],
  providers: [MessageService],
  templateUrl: "./auth-dialog.component.html",
  styleUrl: "./auth-dialog.component.css",
})
export class AuthDialogComponent {
  @Input() authDialogVisible: boolean;
  @Output() closeDialog = new EventEmitter();
  loginForm: FormGroup;

  constructor(private toast: MessageService) {
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
      this.toast.add({
        severity: "error",
        summary: "Atenção!",
        detail: "Preencha os campos do formulário corretamente!",
      });
      console.log(this.loginForm.value);
      return;
    }
  }

  _closeDialog() {
    this.closeDialog.emit();
  }
}
