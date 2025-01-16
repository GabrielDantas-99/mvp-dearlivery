import { Component, inject } from "@angular/core";
import { AdminLayoutComponent } from "../../../components/admin-layout/admin-layout.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { Category } from "@core/interfaces/category";
import { CategoryService } from "@core/services/category.service";
import { MultiSelectModule } from "primeng/multiselect";
import { Product } from "@core/interfaces/product";
import { FileUpload } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { CommonModule, NgIf } from "@angular/common";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Editor } from "primeng/editor";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductService } from "@core/services/product.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { delay, first } from "rxjs";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface ProductForm {
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  inStock: FormControl<number>;
  categories: FormControl<Category[]>;
  imgUrl?: FormControl<string>;
}

@Component({
  selector: "app-product-form",
  imports: [
    AdminLayoutComponent,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FileUpload,
    ToastModule,
    CommonModule,
    ButtonModule,
    Editor,
    RouterLink,
    NgIf,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.css",
})
export class ProductFormComponent {
  categories: Category[] = null;
  uploadedFiles: any[] = [];

  product: Product = {};
  productForm: FormGroup;

  isLoading: boolean = false;
  formType: "Atualizar" | "Cadastrar" = "Cadastrar";

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.findAllCategories();
    this.setFormType();
    this.initForm();
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      imgUrl: new FormControl(null),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      price: new FormControl(null, [Validators.required]),
      inStock: new FormControl(null, [Validators.required]),
      categories: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  findAllCategories() {
    this.categoryService.findAll().subscribe((res) => {
      this.categories = res;
    });
  }

  submit() {
    switch (this.formType) {
      case "Cadastrar":
        this.cadastrar();
        break;
      case "Atualizar":
        this.atualizar();
        break;
    }
  }

  setFormType() {
    const productId = Number(this.route.snapshot.paramMap.get("productId"));
    if (productId) {
      this.productService.findById(productId).subscribe((res) => {
        this.product = { id: productId, ...res };
      });
      this.formType = "Atualizar";
    }
  }

  onUpload(event: UploadEvent | any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }

  cadastrar() {
    this.isLoading = true;
    if (!this.productForm.valid) {
      this.messageService.add(invalidFormMessage);
      this.isLoading = false;
      return;
    }
    this.productService
      .registerProduct({ ...this.productForm.value, storeId: 1 })
      .subscribe({
        next: (res) => {
          this.messageService.add(
            successMessage("Produto cadastrado com sucesso!")
          );
          this.productForm.reset();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.messageService.add(
            errorMessage("Houver um erro ao cadastrar o produto!")
          );
        },
      });
  }

  atualizar() {
    this.isLoading = true;
    if (!this.productForm.valid) {
      this.messageService.add(invalidFormMessage);
      this.isLoading = false;
      return;
    }
    this.productService
      .updateProduct({
        id: this.product.id,
        ...this.productForm.value,
        storeId: 1,
      })
      .subscribe({
        next: (res) => {
          this.messageService.add(
            successMessage("Produto atualizado com sucesso!")
          );
          this.productForm.reset();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.messageService.add(
            errorMessage("Houver um erro ao atualizar o produto!")
          );
        },
      });
  }

  deleteProduct() {
    return this.productService.delete(this.product.id).subscribe({
      next: (res) => {
        this.product = {};
        this.formType = "Cadastrar";
        this.messageService.add({
          severity: "success",
          summary: "Confirmação",
          detail: "Registro deletado com sucesso!",
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail:
            "Este produto possui pedidos vinculados e não pode ser deletado!",
        });
        console.log(err);
      },
    });
  }

  deleteConfirmationDialog() {
    this.confirmationService.confirm({
      header: "Você tem certeza?",
      message: "Ao confirmar você apagará este produto permanentemente.",
      accept: () => {
        this.deleteProduct();
      },
      reject: () => {
        this.messageService.add({
          severity: "info",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }
}

const successMessage = (msg: string) => {
  return {
    severity: "success",
    summary: "Sucesso",
    detail: msg,
  };
};
const errorMessage = (msg: string) => {
  return {
    severity: "warn",
    summary: "Opsss...",
    detail: msg,
  };
};
const invalidFormMessage = {
  severity: "error",
  summary: "Erro",
  detail: "Preencha os campos do formulário corretamente!",
};
