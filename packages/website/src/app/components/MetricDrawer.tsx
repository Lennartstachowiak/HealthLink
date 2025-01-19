"use client";

import { useState, ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Metric } from "@/types/results";
import StatusChip from "./StatusChip";

interface MetricDrawerProps {
  metric: Metric;
  children: ReactNode; // Allow children to be passed in
}

export function MetricDrawer({ metric, children }: MetricDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Metric Details</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {/* Metric Details */}
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {metric.label}
              </p>
              <p className="text-sm text-gray-500">{metric.description}</p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <StatusChip status={metric.status} />
            </div>

            {/* Unit */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">Unit:</span> {metric.unit}
            </div>

            <Separator className="my-4" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white font-medium transition hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
