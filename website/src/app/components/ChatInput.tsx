"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { Card } from "@/components/ui/card";

interface ChatInputProps {
  suggestedQuestions: string[];
}

export function ChatInput(props: ChatInputProps) {
  const { suggestedQuestions } = props;
  return (
    <Card className="bottom-0 left-0 right-0 bg-white pb-4 pt-4 shadow-none">
      <div className="mx-auto max-w-4xl">
        <SuggestedQuestions suggestedQuestions={suggestedQuestions} />
        <div className="flex gap-2 px-4">
          <Input
            placeholder="Ask about your lab results..."
            className="flex-1"
          />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
