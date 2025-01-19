"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecommendedActions } from "./RecommendedActions";
import { Result } from "@/types/results";
import ResultSummary from "./ResultSummary";
import { MetricDrawer } from "./MetricDrawer";
import StatusChip from "./StatusChip";

interface MetricProps {
  label: string;
  status: "normal" | "high" | "low";
  description: string;
  interpretation?: string;
  unit?: string;
}

function Metric({ label, status, description, unit }: MetricProps) {
  return (
    <Card className="rounded-2xl border p-4 shadow-none">
      <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
        <span className="text-sm text-gray-600">{unit}</span>
        <StatusChip status={status} />
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
            <MetricDrawer key={`metric_drawer_${index}`} metric={metric}>
              <Metric key={`metric_${index}`} {...metric} />
            </MetricDrawer>
          ))}
        </div>
        <RecommendedActions recommendedActions={recommendedActions} />
      </CardContent>
    </Card>
  );
}
