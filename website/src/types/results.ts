// Represents each recommended action with UI-related fields
export interface RecommendedAction {
  header: string;
  text: string;
  buttenText: string; // Consider renaming to "buttonText" for clarity
  iconType: string;
}

// Represents each metric associated with a result
export interface Metric {
  unit: string;
  label: string;
  status: "normal" | "high" | "low";
  description: string;
}

// Represents each result item in the results array
export interface Result {
  value: string;
  updatedAt: string;
  title: string;
  summary: string;
  recommendedActions: RecommendedAction[];
  suggestedQuestions: string[];
  metrics: Metric[];
}

// Full results structure
export type Results = Result[];
