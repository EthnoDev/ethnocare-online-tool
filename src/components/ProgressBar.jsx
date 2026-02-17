// src/components/ProgressBar.jsx

export default function ProgressBar({ currentStep = 0, totalSteps = 5 }) {
  const steps = Array.from({ length: totalSteps });

  return (
    <div className="flex justify-center gap-2">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`h-1.5 w-10 rounded-full transition-colors duration-300 ${
            index < currentStep
              ? "bg-[#090C41]"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
