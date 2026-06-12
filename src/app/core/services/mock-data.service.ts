import { Injectable } from "@angular/core";
import { Transaction } from "../models/transaction.model";
import { Budget } from "../models/budget.model";

@Injectable({ providedIn: "root" })
export class MockDataService {
  getTransactions(): Transaction[] {
    return [
      {
        id: "1",
        title: "Salary",
        amount: 5000,
        category: "income",
        date: "2026-06-01",
        type: "income",
      },
      {
        id: "2",
        title: "Rent",
        amount: 1500,
        category: "housing",
        date: "2026-06-02",
        type: "expense",
      },
      {
        id: "3",
        title: "Groceries",
        amount: 120,
        category: "food",
        date: "2026-06-03",
        type: "expense",
      },
      {
        id: "4",
        title: "Uber",
        amount: 25,
        category: "transport",
        date: "2026-06-04",
        type: "expense",
      },
      {
        id: "5",
        title: "Netflix",
        amount: 15,
        category: "entertainment",
        date: "2026-06-05",
        type: "expense",
      },
      {
        id: "6",
        title: "Gym",
        amount: 50,
        category: "health",
        date: "2026-06-06",
        type: "expense",
      },
      {
        id: "7",
        title: "Amazon",
        amount: 85,
        category: "shopping",
        date: "2026-06-07",
        type: "expense",
      },
      {
        id: "8",
        title: "Freelance",
        amount: 800,
        category: "income",
        date: "2026-06-08",
        type: "income",
      },
      {
        id: "9",
        title: "Restaurant",
        amount: 60,
        category: "food",
        date: "2026-06-09",
        type: "expense",
      },
      {
        id: "10",
        title: "Gas",
        amount: 40,
        category: "transport",
        date: "2026-06-10",
        type: "expense",
      },
    ];
  }

  getBudgets(): Budget[] {
    return [
      {
        category: "food",
        limit: 400,
        spent: 180,
        remaining: 220,
        percentage: 45,
      },
      {
        category: "transport",
        limit: 200,
        spent: 65,
        remaining: 135,
        percentage: 32,
      },
      {
        category: "housing",
        limit: 1600,
        spent: 1500,
        remaining: 100,
        percentage: 93,
      },
      {
        category: "entertainment",
        limit: 100,
        spent: 15,
        remaining: 85,
        percentage: 15,
      },
      {
        category: "health",
        limit: 150,
        spent: 50,
        remaining: 100,
        percentage: 33,
      },
      {
        category: "shopping",
        limit: 300,
        spent: 85,
        remaining: 215,
        percentage: 28,
      },
    ];
  }
}
