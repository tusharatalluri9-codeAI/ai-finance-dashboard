import { Injectable, inject } from '@angular/core';
import { FinanceStore } from '../../store/finance.store';
import { AiInsight } from '../models/insight.model';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AiService {
  private store = inject(FinanceStore);
  private apiUrl = '/api/v1/messages';
  // prettier-ignore
  private apiKey = 'YOUR_ANTHROPIC_KEY_HERE';

  async askQuestion(question: string): Promise<void> {
    const insight: AiInsight = {
      id: Date.now().toString(),
      question,
      answer: '',
      timestamp: new Date(),
      loading: true,
    };

    this.store.addInsight(insight);

    const transactions = this.store.transactions();
    const balance = this.store.balance();
    const totalIncome = this.store.totalIncome();
    const totalExpenses = this.store.totalExpenses();

    const context = `
      You are a personal finance assistant. Here is the user's financial data:
      - Balance: $${balance}
      - Total Income: $${totalIncome}
      - Total Expenses: $${totalExpenses}
      - Recent Transactions: ${JSON.stringify(transactions)}
      
      Answer the following question concisely in 2-3 sentences:
      ${question}
    `;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: context }],
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
        },
      );

      const answer = response.data.content[0].text;

      const updatedInsights = this.store
        .insights()
        .map((i) => (i.id === insight.id ? { ...i, answer, loading: false } : i));
      this.store.setInsights(updatedInsights);
    } catch (error) {
      const updatedInsights = this.store.insights().map((i) =>
        i.id === insight.id
          ? {
              ...i,
              answer: 'Sorry, I could not process your question. Please try again.',
              loading: false,
            }
          : i,
      );
      this.store.setInsights(updatedInsights);
    }
  }
}
