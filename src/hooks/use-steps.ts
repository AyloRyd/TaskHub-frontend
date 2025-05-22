import { useEffect, useState } from "react";

export function useSteps(totalSteps: number) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handlePopState = () => {
      if (step > 1) {
        setStep((prev) => Math.max(1, prev - 1));
        history.pushState(null, "", window.location.pathname);
      }
    };

    if (step > 1) {
      history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [step]);

  const nextStep = () => {
    setStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return {
    step,
    nextStep,
    previousStep,
  };
}