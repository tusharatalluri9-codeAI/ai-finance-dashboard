export type TransactionCategory =
  | "food"
  | "transport"
  | "housing"
  | "entertainment"
  | "health"
  | "shopping"
  | "income"
  | "other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  type: "income" | "expense";
  description?: string;
}
