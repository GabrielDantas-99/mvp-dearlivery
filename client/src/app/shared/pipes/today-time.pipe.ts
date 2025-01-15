import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "todayTime",
})
export class TodayTimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return "";
    }
    const date = new Date();

    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const diaSemana = diasDaSemana[date.getDay()];
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const ano = date.getFullYear();

    return `${diaSemana} ${dia} ${mes}, ${ano}`;
  }
}
