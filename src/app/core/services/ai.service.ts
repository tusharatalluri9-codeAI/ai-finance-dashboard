import { Injectable, inject } from "@angular/core";
import { FinanceStore } from "../../store/finance.store";
import { AiInsight } from "../models/insight.model";
import axios from "axios";

@Injectable({ providedIn: "root" })
export class AiService {
  private store = inject(FinanceStore);
  private apiUrl = "https://api.openai.com/v1/chat/completions";
  private apiKey = "OPENAI_API_KEY_PLACEHOLDER"; // paste your key here

  async askQuestion(question: string): Promise<void> {
    const insight: AiInsight = {
      id: Date.now().toString(),
      question,
      answer: "",
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
      
      Answer the following question concisely and helpfully:
      ${question}
    `;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: "gpt-4o-mini",
          max_tokens: 300,
          messages: [
            {
              role: "system",
              content: "You are a helpful personal finance assistant.",
            },
            { role: "user", content: context },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      const answer = response.data.choices[0].message.content;

      const updatedInsights = this.store
        .insights()
        .map((i) =>
          i.id === insight.id ? { ...i, answer, loading: false } : i,
        );
      this.store.setInsights(updatedInsights);
    } catch (error) {
      const updatedInsights = this.store.insights().map((i) =>
        i.id === insight.id
          ? {
              ...i,
              answer:
                "Sorry, I could not process your question. Please try again.",
              loading: false,
            }
          : i,
      );
      this.store.setInsights(updatedInsights);
    }
  }
}
