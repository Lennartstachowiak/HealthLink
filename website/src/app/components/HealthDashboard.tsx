"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Result } from "@/types/results";
import { WelcomeBanner } from "./WelcomeBanner";
import { ChatInput } from "./ChatInput";
import { Results } from "./Results";

interface HealthDashboardProps {
  results: Result[];
}

export default function HealthDashboard(props: HealthDashboardProps) {
  const { results } = props;
  const [result, setResult] = useState<Result>(results[0] as Result);
  if (!result) {
    return <span>Select result</span>;
  } else {
    return (
      <div className="min-h-screen bg-gray-50 pb-40">
        <Header
          result={result}
          setResult={setResult}
          results={results as Result[]}
        />
        <main className="mx-auto max-w-[1200px] space-y-6 p-6">
          <WelcomeBanner />
          <Results result={result} />
        </main>
        <ChatInput suggestedQuestions={result.suggestedQuestions} />
      </div>
    );
  }
}
