import { Component, OnInit } from "@angular/core";
import { AdminLayoutComponent } from "../../components/admin-layout/admin-layout.component";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { Order } from "../../../../core/interfaces/order";
import { OrderService } from "../../services/order.service";
import { Observable } from "rxjs";
import { CurrencyBrPipe } from "../../../../shared/pipes/currency-br.pipe";
import { DateTimePipe } from "../../../../shared/pipes/date-time.pipe";
import { OrderStatus } from "../../../../core/enums/order-status";
import { ProgressSpinner } from "primeng/progressspinner";
import { TodayTimePipe } from "../../../../shared/pipes/today-time.pipe";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";

type SummaryCard = {
  title: string;
  label: string;
  value: number;
  icon: string;
};

@Component({
  selector: "app-overview",
  imports: [
    AdminLayoutComponent,
    CardModule,
    TableModule,
    CommonModule,
    RouterLink,
    ButtonModule,
    AsyncPipe,
    IconFieldModule,
    NgIf,
    CurrencyBrPipe,
    DateTimePipe,
    ProgressSpinner,
    InputIconModule,
    TodayTimePipe,
    InputTextModule,
  ],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.css",
})
export class OverviewComponent implements OnInit {
  orders$: Observable<Order[]>;
  date = new Date();

  summaryCards: SummaryCard[] = [
    {
      title: "Produtos",
      label: "Cadastrados",
      value: 28,
      icon: "pi-cart-arrow-down",
    },
    {
      title: "Categorias",
      label: "Relacionadas",
      value: 5,
      icon: "pi-tags",
    },
    {
      title: "Pedidos",
      label: "Finalizados",
      value: 121,
      icon: "pi-box",
    },
    {
      title: "Clientes",
      label: "Registrados",
      value: 56,
      icon: "pi-users",
    },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.findByStoreId();
  }

  getOrderStatus(status) {
    return OrderStatus[status];
  }

  getTargetValue(event: any): any {
    return event.target.value as EventTarget;
  }
}
