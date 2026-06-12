import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: "transactions",
    loadComponent: () =>
      import("./features/transactions/transactions.component").then(
        (m) => m.TransactionsComponent,
      ),
  },
  {
    path: "budget",
    loadComponent: () =>
      import("./features/budget/budget.component").then(
        (m) => m.BudgetComponent,
      ),
  },
  {
    path: "ai-insights",
    loadComponent: () =>
      import("./features/ai-insights/ai-insights.component").then(
        (m) => m.AiInsightsComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
