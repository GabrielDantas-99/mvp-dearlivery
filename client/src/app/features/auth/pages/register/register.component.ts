import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { TermsDialogComponent } from "@features/auth/components/terms-dialog/terms-dialog.component";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Checkbox } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";

interface LoginForm {
  username: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  repassword: FormControl;
  terms: FormControl;
}

@Component({
  selector: "app-register",
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    Checkbox,
    RouterLink,
    TermsDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  termsVisible: boolean = false;

  loginForm!: FormGroup<LoginForm>;

  constructor(private toast: MessageService) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      surname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      repassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      terms: new FormControl(null, [Validators.required]),
    });
  }

  register() {
    if (!this.loginForm.valid) {
      this.toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Preencha os campos do formulário corretamente!",
      });
      return;
    }
    console.log(this.loginForm.get("terms").value);
  }

  openTerms() {}

  closeTerms() {
    this.termsVisible = false;
  }

  get now() {
    return Date();
  }
}
