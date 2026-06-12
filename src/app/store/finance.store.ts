import { computed } from "@angular/core";
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from "@ngrx/signals";
import { Transaction } from "../core/models/transaction.model";
import { Budget } from "../core/models/budget.model";
import { AiInsight } from "../core/models/insight.model";

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  insights: AiInsight[];
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  transactions: [],
  budgets: [],
  insights: [],
  loading: false,
  error: null,
};

export const FinanceStore = signalStore(
  { providedIn: "root" },
  withState(initialState),

  withComputed(({ transactions }) => ({
    totalIncome: computed(() =>
      transactions()
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    ),
    totalExpenses: computed(() =>
      transactions()
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    ),
    balance: computed(() => {
      const income = transactions()
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = transactions()
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      return income - expenses;
    }),
    expensesByCategory: computed(() => {
      const expenses = transactions().filter((t) => t.type === "expense");
      return expenses.reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      );
    }),
  })),

  withMethods((store) => ({
    setTransactions(transactions: Transaction[]) {
      patchState(store, { transactions });
    },
    addTransaction(transaction: Transaction) {
      patchState(store, {
        transactions: [...store.transactions(), transaction],
      });
    },
    setBudgets(budgets: Budget[]) {
      patchState(store, { budgets });
    },
    addInsight(insight: AiInsight) {
      patchState(store, { insights: [...store.insights(), insight] });
    },
    setInsights(insights: AiInsight[]) {
      patchState(store, { insights });
    },
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
    setError(error: string | null) {
      patchState(store, { error });
    },
  })),
);
