import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FinanceStore } from "../../store/finance.store";
import { Transaction } from "../../core/models/transaction.model";

@Component({
  selector: "app-transactions",
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent {
  store = inject(FinanceStore);
  filterType = signal<"all" | "income" | "expense">("all");

  filteredTransactions = computed(() => {
    const type = this.filterType();
    const transactions = this.store.transactions();
    if (type === "all") return transactions;
    return transactions.filter((t) => t.type === type);
  });

  setFilter(type: "all" | "income" | "expense") {
    this.filterType.set(type);
  }
}
