"use client";
import { Activity, CircleDotDashed, Cog, Stethoscope } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-32 h-32 flex gap-1 items-center justify-center">
        <Cog className="size-7 animate-spin text-primary" />

        <span className="relative flex size-14">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <div className="relative inline-flex size-14 rounded-full bg-slate-300 items-center justify-center">
            <Activity className="size-10 animate-bounce text-red-400" />
          </div>
        </span>
        <Cog className="size-7 animate-spin text-primary" />
      </div>
    </div>
  );
}
