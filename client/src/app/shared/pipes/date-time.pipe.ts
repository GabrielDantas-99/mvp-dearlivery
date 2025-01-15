import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateTime",
})
export class DateTimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return "";
    }

    const date = new Date(value as string | number | Date);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("pt-BR", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} às ${hours}:${minutes}`;
  }
}
