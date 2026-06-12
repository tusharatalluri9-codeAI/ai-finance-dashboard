export interface AiInsight {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
  loading?: boolean;
}
