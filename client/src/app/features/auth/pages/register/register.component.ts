import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { TermsDialogComponent } from "@features/auth/components/terms-dialog/terms-dialog.component";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Checkbox } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { InputMask } from "primeng/inputmask";

interface LoginForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  phone: FormControl;
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
    InputMask,
  ],
  providers: [MessageService],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  termsVisible: boolean = false;

  loginForm!: FormGroup<LoginForm>;

  constructor(
    private toast: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
    });
  }

  terms = new FormControl(null, [Validators.required]);

  register() {
    if (!this.loginForm.valid) {
      this.toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Preencha os campos do formulário corretamente!",
      });
      return;
    }
    this.authService.register(this.loginForm.value).subscribe((res) => {
      this.router.navigate(["/"]);
    });
  }

  openTerms() {}

  closeTerms() {
    this.termsVisible = false;
  }

  get now() {
    return Date();
  }
}
