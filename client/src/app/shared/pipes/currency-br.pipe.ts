import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyBr",
})
export class CurrencyBrPipe implements PipeTransform {
  transform(value: number, showSymbol: boolean = true): string {
    if (value === null || value === undefined) {
      return "";
    }

    const formattedValue = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return showSymbol
      ? formattedValue
      : formattedValue.replace("R$", "").trim();
  }
}
