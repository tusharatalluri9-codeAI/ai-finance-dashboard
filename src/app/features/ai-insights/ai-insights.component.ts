import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FinanceStore } from "../../store/finance.store";
import { AiService } from "../../core/services/ai.service";

@Component({
  selector: "app-ai-insights",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./ai-insights.component.html",
  styleUrl: "./ai-insights.component.scss",
})
export class AiInsightsComponent {
  store = inject(FinanceStore);
  aiService = inject(AiService);
  question = signal("");

  suggestions = [
    "How much did I spend on food this month?",
    "Am I overspending on any category?",
    "How can I improve my savings?",
    "What is my biggest expense?",
  ];

  async ask() {
    const q = this.question();
    if (!q.trim()) return;
    this.question.set("");
    await this.aiService.askQuestion(q);
  }

  useSuggestion(suggestion: string) {
    this.question.set(suggestion);
  }
}
