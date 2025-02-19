"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  {
    text: "Searching for top agencies...",
  },
  {
    text: "Analyzing agency profiles...",
  },
  {
    text: "Finding the perfect match...",
  },
  {
    text: "Preparing your results...",
  }
];

export default function Loading() {
  return (
    <div className="h-screen w-screen">
      <MultiStepLoader loadingStates={loadingStates} />
    </div>
  );
}
