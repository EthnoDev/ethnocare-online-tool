// src/pages/assistance/Welcome.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

export default function Welcome() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);

    setTimeout(() => {
      navigate("/assistance/product");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/" code={true}>
      <div className="w-full max-w-md mt-2">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          Ethnocare Assistance Tool
        </h1>

        <p className="mt-6 text-center text-base text-slate-500 leading-relaxed px-8">
          Use this tool to get assistance and resolve issues related to your
          product.
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
