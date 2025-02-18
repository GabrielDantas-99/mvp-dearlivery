import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";

@Component({
  selector: "app-terms-dialog",
  imports: [Dialog, ButtonModule],
  templateUrl: "./terms-dialog.component.html",
  styleUrl: "./terms-dialog.component.css",
})
export class TermsDialogComponent {
  @Input() termsVisible: boolean = false;
  @Output() closeTerms = new EventEmitter();

  _closeTerms() {
    this.closeTerms.emit();
  }
}
