import { OrderItem } from "./order-item";
import { Payment } from "./payment";
import { User } from "./user";

export interface Order {
  id?: number;
  client?: User;
  total?: number;
  moment?: string;
  orderStatus?: string;
  items?: OrderItem[];
  payment?: Payment;
}
