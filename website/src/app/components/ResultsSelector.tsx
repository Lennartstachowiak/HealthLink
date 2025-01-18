"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Result } from "@/types/results";
import { Dispatch } from "react";

// Custom Searchable Dropdown Components

interface DropdownProps {
  children: React.ReactNode;
}

function Dropdown({ children }: DropdownProps) {
  return <div className="max-h-60 overflow-y-auto">{children}</div>;
}

interface DropdownItemProps {
  value: string;
  isSelected: boolean;
  onSelect: () => void;
  title: string;
}

function DropdownItem({
  value,
  isSelected,
  onSelect,
  title,
}: DropdownItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
        isSelected ? "bg-gray-200" : ""
      }`}
    >
      {isSelected && <Check className="h-4 w-4 text-green-500" />}
      <span>{title}</span>
    </div>
  );
}

interface TestSelectorProps {
  results: Result[];
  result: Result;
  setResult: Dispatch<React.SetStateAction<Result>>;
}

export function ResultsSelector({
  results = [],
  result,
  setResult,
}: TestSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredResults = results.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full px-2 py-1 text-sm flex items-center justify-between"
        >
          <span className="max-w-[150px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] truncate overflow-hidden whitespace-nowrap">
            {result?.title || "Select a result"}
          </span>
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[280px] p-0">
        <input
          type="text"
          placeholder="Search tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border-b border-gray-200 focus:outline-none"
        />
        {filteredResults.length > 0 ? (
          <Dropdown>
            {filteredResults.map((item) => (
              <DropdownItem
                key={item.value}
                value={item.value}
                title={item.title}
                isSelected={item.value === result?.value}
                onSelect={() => {
                  setResult(item);
                  setOpen(false);
                  setSearch("");
                }}
              />
            ))}
          </Dropdown>
        ) : (
          <div className="p-4 text-gray-500">No test found.</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
