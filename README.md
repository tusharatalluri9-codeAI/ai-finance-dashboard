# 💰 AI Finance Dashboard

An intelligent personal finance dashboard built with **Angular 21** featuring AI-powered insights, real-time budget tracking, and natural language financial queries.

![Angular](https://img.shields.io/badge/Angular-21-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-Signals-purple?style=flat-square)
![AI](https://img.shields.io/badge/AI-Claude%20Haiku-orange?style=flat-square)

## ✨ Features

- **AI Financial Assistant** — Ask natural language questions about your finances powered by Claude AI
- **Interactive Dashboard** — Real-time balance, income, and expense summaries
- **Transaction Tracker** — Filter and view all transactions by type
- **Budget Manager** — Visual progress bars with overspending alerts
- **Modern Angular 21** — Signals, computed values, standalone components, lazy loading

## 🛠 Tech Stack

| Technology            | Purpose              |
| --------------------- | -------------------- |
| Angular 21            | Frontend framework   |
| TypeScript (strict)   | Type safety          |
| NgRx Signal Store     | State management     |
| Angular Signals       | Reactive local state |
| Chart.js              | Data visualization   |
| Claude AI (Anthropic) | AI-powered insights  |
| Angular Material      | UI components        |
| SCSS                  | Styling              |

## 🏗 Architecture

src/
├── app/
│ ├── core/
│ │ ├── models/ # TypeScript interfaces
│ │ └── services/ # AI & data services
│ ├── features/
│ │ ├── dashboard/ # Summary cards & charts
│ │ ├── transactions/ # Transaction list & filters
│ │ ├── budget/ # Budget progress tracker
│ │ └── ai-insights/ # AI chat interface
│ └── store/ # NgRx Signal Store

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21+

### Installation

```bash
# Clone the repo
git clone https://github.com/tusharatalluri9-codeAI/ai-finance-dashboard.git

# Navigate to project
cd ai-finance-dashboard

# Install dependencies
npm install

# Add your Anthropic API key in
# src/app/core/services/ai.service.ts
# Replace 'YOUR_ANTHROPIC_KEY_HERE' with your key

# Start the dev server
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

## 🤖 AI Features

The AI assistant has full context of your financial data and can answer questions like:

- _"How much did I spend on food this month?"_
- _"Am I overspending on any category?"_
- _"How can I improve my savings?"_
- _"What is my biggest expense?"_

## 📸 Screenshots

> Dashboard, Transactions, Budget, and AI Insights pages

## 🔑 Environment Setup

This project requires an [Anthropic API key](https://console.anthropic.com). Add it to:
