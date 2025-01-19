"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
      <p className="ml-2 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
}
