"use client";

import { useEffect, useState } from "react";
import { getResults } from "./actions";
import HealthDashboard from "./components/HealthDashboard";
import { Result } from "@/types/results";

export default function HomePage() {
  const [results, setResults] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getResults();
      setResults(results);
      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading || !results) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return <HealthDashboard results={results} />;
}
