"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendedActions } from "./RecommendedActions";
import { Result } from "@/types/results";
import ResultSummary from "./ResultSummary";

interface MetricProps {
  label: string;
  status: "normal" | "high" | "low";
  description: string;
  interpretation?: string;
  unit?: string;
}

function Metric({ label, status, description, unit }: MetricProps) {
  const getStatusColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "normal":
        return "bg-green-50 text-green-600";
      case "high":
        return "bg-orange-50 text-orange-600";
      case "low":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <Card className="rounded-2xl border p-4 shadow-none">
      <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
        <span className="text-sm text-gray-600">{unit}</span>
        <span
          className={`text-sm drop-shadow-none px-2 py-1 rounded-2xl ${getStatusColor(
            status
          )} `}
        >
          {status}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="mb-2 text-lg font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

interface TestResultsProps {
  result: Result;
}

export function Results({ result }: TestResultsProps) {
  const { updatedAt, title, summary, recommendedActions, metrics } = result;
  return (
    <Card className="rounded-2xl shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-teal-600">Latest Results</h2>
          <h3 className="mt-2 text-xl font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{updatedAt}</p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm text-gray-700"
        >
          <span>View original file</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ResultSummary summary={summary} />
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <Metric key={`metric_${index}`} {...metric} />
          ))}
        </div>
        <RecommendedActions recommendedActions={recommendedActions} />
      </CardContent>
    </Card>
  );
}
