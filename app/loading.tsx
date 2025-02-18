"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  {
    text: "Loading your experience...",
  },
  {
    text: "Getting things ready...",
  },
  {
    text: "Almost there...",
  },
];

const Loading = () => {
  return <MultiStepLoader loadingStates={loadingStates} loading={true} />;
};

export default Loading;
