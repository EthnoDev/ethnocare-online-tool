// src/pages/return/Welcome.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

export default function Welcome() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (isStarting) return; // prevent double click
    setIsStarting(true);

    setTimeout(() => {
      navigate("/return/identification");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/" code={true}>
      <div className="w-full max-w-md mt-2">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          Ethnocare Return Tool
        </h1>

        <p className="mt-6 text-center text-base text-slate-500">
          Use this tool to return a product
        </p>

        <div className="mt-10 flex justify-center">
          <SelectableOption
            label="Start"
            selected={isStarting}
            onClick={handleStart}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
