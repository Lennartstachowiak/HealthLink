import React, { useEffect, useState } from "react";

interface StatusChipProps {
  isLoading: boolean; // Control visibility
  color?: string; // Optional custom color for the dots
}

export function StatusChip({ isLoading, color = "#4AA69A" }: StatusChipProps) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDotCount((prev) => (prev < 3 ? prev + 1 : 0)); // Increment dots up to 3, then reset
      }, 500); // Adjust speed of animation
      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setDotCount(0); // Reset dots when not loading
    }
  }, [isLoading]);

  return (
    isLoading && (
      <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full shadow-sm">
        {/* Green Dot */}
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{
            backgroundColor: color,
          }}
        ></div>
        {/* Label with Animated Dots */}
        <span className="text-sm text-gray-800 font-medium">
          {"Loading" + ".".repeat(dotCount)}
        </span>
      </div>
    )
  );
}
