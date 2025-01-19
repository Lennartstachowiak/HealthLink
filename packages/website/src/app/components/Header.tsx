"use client";

import { ResultsSelector } from "./ResultsSelector";
import { Card, CardHeader } from "@/components/ui/card";
import { Result } from "@/types/results";
import { Dispatch, SetStateAction } from "react";
import HealthLinkIcon from "./HealthLinkIcon";
import { UserSettings } from "./UserSettings";

interface HeaderProps {
  results: Result[];
  result: Result;
  setResult: Dispatch<SetStateAction<Result>>;
}

export function Header(props: HeaderProps) {
  return (
    <Card className="shadow-none top-0 left-0 right-0">
      <CardHeader className="bg-white w-full py-4">
        <div className="flex items-center justify-between ">
          <HealthLinkIcon />
          <div className="flex flex-row items-center gap-4">
            <ResultsSelector {...props} />
            <UserSettings />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
