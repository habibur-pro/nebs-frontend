"use client";

import { FileText, Loader2 } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={`flex  flex-col items-center justify-center gap-4 ${className}`}
    >
      {/* Icon container */}
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <Loader2 className="absolute h-16 w-16 animate-spin text-primary/30" />

        {/* Center icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
