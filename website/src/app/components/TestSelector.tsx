"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Result } from "@/types/results";

const tests = [
  {
    value: "blood-test",
    label: "Blood Test Results (Jan 2024)",
  },
  {
    value: "fungal-test",
    label: "Fungal Test Results (Dec 2023)",
  },
  {
    value: "biopsy",
    label: "Biopsy Results (Nov 2023)",
  },
];

interface TestSelectorProps {
  result: Result;
  setResult: React.Dispatch<React.SetStateAction<Result>>;
}

export function TestSelector(props: TestSelectorProps) {
  const { result, setResult } = props;
  const [value, setValue] = React.useState("blood-test");
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          {value
            ? tests.find((test) => test.value === value)?.label
            : "Select test..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search tests..." />
          <CommandEmpty>No test found.</CommandEmpty>
          <CommandGroup>
            {tests.map((test) => (
              <CommandItem
                key={test.value}
                value={test.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === test.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {test.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
