import { TestBed } from '@angular/core/testing';
import { FinanceStore } from './finance.store';
import { Transaction } from '../core/models/transaction.model';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    category: 'income',
    date: '2026-06-01',
    type: 'income',
  },
  {
    id: '2',
    title: 'Rent',
    amount: 1500,
    category: 'housing',
    date: '2026-06-02',
    type: 'expense',
  },
  { id: '3', title: 'Food', amount: 200, category: 'food', date: '2026-06-03', type: 'expense' },
];

describe('FinanceStore', () => {
  let store: InstanceType<typeof FinanceStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(FinanceStore);
  });

  it('should initialize with empty transactions', () => {
    expect(store.transactions()).toEqual([]);
  });

  it('should set transactions correctly', () => {
    store.setTransactions(mockTransactions);
    expect(store.transactions().length).toBe(3);
  });

  it('should calculate total income correctly', () => {
    store.setTransactions(mockTransactions);
    expect(store.totalIncome()).toBe(5000);
  });

  it('should calculate total expenses correctly', () => {
    store.setTransactions(mockTransactions);
    expect(store.totalExpenses()).toBe(1700);
  });

  it('should calculate balance correctly', () => {
    store.setTransactions(mockTransactions);
    expect(store.balance()).toBe(3300);
  });

  it('should add a transaction', () => {
    store.setTransactions(mockTransactions);
    store.addTransaction({
      id: '4',
      title: 'Gym',
      amount: 50,
      category: 'health',
      date: '2026-06-04',
      type: 'expense',
    });
    expect(store.transactions().length).toBe(4);
  });

  it('should group expenses by category', () => {
    store.setTransactions(mockTransactions);
    const byCategory = store.expensesByCategory();
    expect(byCategory['housing']).toBe(1500);
    expect(byCategory['food']).toBe(200);
  });
});
