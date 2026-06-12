import { Component, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FinanceStore } from "../../store/finance.store";

@Component({
  selector: "app-budget",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./budget.component.html",
  styleUrl: "./budget.component.scss",
})
export class BudgetComponent {
  store = inject(FinanceStore);

  getBarColor(percentage: number): string {
    if (percentage >= 90) return "#ef4444";
    if (percentage >= 70) return "#f59e0b";
    return "#22c55e";
  }
}
