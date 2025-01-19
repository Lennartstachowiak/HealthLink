"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { cn } from "@/lib/utils"; // Replace with your utility for handling classNames

interface SnackbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  text: string;
}

export function Snackbar(props: SnackbarProps) {
  const { setOpen, open, text } = props;
  return (
    <div className="fixed bottom-4 right-4">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "w-80 p-4 rounded-lg shadow-lg bg-white",
          "border border-gray-200",
          "data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom"
        )}
      >
        <Toast.Title className="font-medium text-gray-900">{text}</Toast.Title>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2" />
    </div>
  );
}
