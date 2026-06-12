import { Component, inject, OnInit, ElementRef, viewChild } from '@angular/core';
import { FinanceStore } from '../../store/finance.store';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  template: `
    <div class="chart-wrapper">
      <h2 class="chart-title">Spending Breakdown</h2>
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      .chart-wrapper {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }
      .chart-title {
        font-size: 16px;
        font-weight: 600;
        color: #1a1d23;
        margin-bottom: 16px;
      }
      canvas {
        max-height: 260px;
      }
    `,
  ],
})
export class SpendingChartComponent implements OnInit {
  store = inject(FinanceStore);
  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  private colors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];

  ngOnInit() {
    const data = this.store.expensesByCategory();
    this.renderChart(data);
  }

  private renderChart(data: Record<string, number>) {
    const canvas = this.chartCanvas()?.nativeElement;
    if (!canvas) return;

    const labels = Object.keys(data);
    const values = Object.values(data);

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: this.colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              font: { size: 13 },
            },
          },
        },
      },
    });
  }
}
