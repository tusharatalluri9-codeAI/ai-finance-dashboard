import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FinanceStore } from '../../store/finance.store';
import { SpendingChartComponent } from '../../shared/components/spending-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, SpendingChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  store = inject(FinanceStore);

  ngOnInit() {}

  get cards() {
    return [
      {
        label: 'Total Balance',
        value: this.store.balance(),
        icon: '💰',
        color: '#6366f1',
      },
      {
        label: 'Total Income',
        value: this.store.totalIncome(),
        icon: '📈',
        color: '#22c55e',
      },
      {
        label: 'Total Expenses',
        value: this.store.totalExpenses(),
        icon: '📉',
        color: '#ef4444',
      },
    ];
  }

  get recentTransactions() {
    return this.store.transactions().slice(-5).reverse();
  }
}
