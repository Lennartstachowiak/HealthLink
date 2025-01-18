"use client";

import { Header } from "./components/Header";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Results } from "./components/Results";
import { ChatInput } from "./components/ChatInput";
import results from "../results";
import { useState } from "react";
import { Result } from "@/types/results";

export default function HealthDashboard() {
  const [result, setResult] = useState<Result>(results[0] as Result);
  return (
    <div className="min-h-screen bg-gray-50">
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
