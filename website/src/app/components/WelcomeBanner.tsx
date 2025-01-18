"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

export function WelcomeBanner() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    setToday(formattedDate);
  }, []);
  return (
    <Card className="rounded-2xl shadow-none ">
      <CardHeader>
        <div className="flex flex-row items-center gap-4 justify-between">
          <div>
            <h1 className="text-lg font-semibold">Hey,</h1>
            <p className="text-muted-foreground">
              Welcome back to your HealthLink dashboard!
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <span>{today}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
