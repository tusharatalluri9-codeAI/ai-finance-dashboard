import { TransactionCategory } from "./transaction.model";

export interface Budget {
  category: TransactionCategory;
  limit: number;
  spent: number;
  remaining: number;
  percentage: number;
}
