"use client";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useEffect, useState } from "react";

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
  {
    text: "Optimizing for you...",
  }
];

const Loading = () => {
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsCompiling(true);
    }
  }, []);

  return (
    <MultiStepLoader 
      loadingStates={loadingStates} 
      loading={true} 
      loop={false}
      isCompiling={isCompiling}
      duration={400}
    />
  );
};

export default Loading;
