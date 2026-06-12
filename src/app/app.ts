import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FinanceStore } from "./store/finance.store";
import { MockDataService } from "./core/services/mock-data.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class AppComponent implements OnInit {
  private store = inject(FinanceStore);
  private mockData = inject(MockDataService);

  navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/transactions", label: "Transactions", icon: "💳" },
    { path: "/budget", label: "Budget", icon: "🎯" },
    { path: "/ai-insights", label: "AI Insights", icon: "🤖" },
  ];

  ngOnInit() {
    this.store.setTransactions(this.mockData.getTransactions());
    this.store.setBudgets(this.mockData.getBudgets());
  }
}
