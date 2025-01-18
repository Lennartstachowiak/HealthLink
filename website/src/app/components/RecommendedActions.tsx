"use client";

import {
  Calendar,
  Bell,
  Salad,
  Heart,
  Stethoscope,
  Pill,
  Droplet,
  Apple,
  Dumbbell,
  Thermometer,
  BedDouble,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RecommendedAction } from "@/types/results";

interface RecommendedActionItemProps {
  index: number;
  header: string;
  text: string;
  buttenText: string;
  iconType: string;
  onClick: () => void;
}

function RecommendedActionItem(props: RecommendedActionItemProps) {
  const { index, header, text, buttenText, iconType, onClick } = props;
  const Icon = getIcon(iconType);
  const getColor = (index: number) => {
    if (index % 3 === 0) {
      return "green";
    } else if (index % 2 === 0) {
      return "blue";
    } else {
      return "red";
    }
  };
  const color = getColor(index);
  return (
    <Card className="rounded-2xl border p-6 shadow-none">
      <CardTitle className="flex flex-row items-center gap-2 p-0 mb-2 text-lg font-medium text-gray-900">
        <div
          className={`size-10 rounded-full flex items-center justify-center bg-${color}-100`}
        >
          <Icon className={`h-4 w-4 text-${color}-600`} />
        </div>
        {header}
      </CardTitle>
      <CardContent className="p-0 mb-6 text-sm text-gray-600">
        {text}
      </CardContent>
      <Button
        variant="outline"
        className={`w-full gap-2 rounded-lg ${color}-50 px-4 py-2 text-sm font-medium text-${color}-600`}
        onClick={onClick}
      >
        <Icon className={`h-4 w-4 text-${color}-600`} />
        {buttenText}
      </Button>
    </Card>
  );
}

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "calendar":
      return Calendar;
    case "reminder":
      return Bell;
    case "diet":
      return Salad;
    case "heart":
      return Heart;
    case "checkup":
      return Stethoscope;
    case "medication":
      return Pill;
    case "blood":
      return Droplet;
    case "nutrition":
      return Apple;
    case "exercise":
      return Dumbbell;
    case "temperature":
      return Thermometer;
    case "sleep":
      return BedDouble;
    case "bell":
      return Bell;
    default:
      return Info;
  }
};

interface RecommendedActionsProps {
  recommendedActions: RecommendedAction[];
}

export function RecommendedActions(props: RecommendedActionsProps) {
  const { recommendedActions } = props;
  return (
    <div className="rounded-2xl bg-white pt-8 shadow-none">
      <h2 className="mb-4 text-lg font-medium text-gray-900">
        Recommended Actions
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendedActions.map((action, index) => {
          return (
            <RecommendedActionItem
              key={`action_${index}`}
              index={index + 1}
              {...action}
            />
          );
        })}
      </div>
    </div>
  );
}
