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

@Component({
  selector: "app-overview",
  imports: [
    AdminLayoutComponent,
    CardModule,
    TableModule,
    CommonModule,
    AsyncPipe,
    NgIf,
    CurrencyBrPipe,
    DateTimePipe,
    ProgressSpinner,
    TodayTimePipe,
  ],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.css",
})
export class OverviewComponent implements OnInit {
  orders$: Observable<Order[]>;
  date = new Date();

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.findByStoreId();
  }

  getOrderStatus(status) {
    return OrderStatus[status];
  }
}
