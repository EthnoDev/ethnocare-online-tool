import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SelectableOption from "../components/SelectableOption";

export default function Welcome() {
  const navigate = useNavigate();
  const [goingTo, setGoingTo] = useState(null); // "sizing" | "assistance" | "return" | ...

  const delayedNav = (key, path, fallbackAlert) => {
    if (goingTo) return; // prevent double taps
    setGoingTo(key);

    setTimeout(() => {
      if (path) navigate(path);
      else fallbackAlert?.();
    }, 200);
  };

  return (
    <PageWrapper showBack={false} backTo="/" code={true}>
      <div className="w-full max-w-md mt-6">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          Ethnocare Online Tool
        </h1>

        <p className="mt-5 text-center text-lg text-slate-500">
          Select the tool you need
        </p>

        <div className="mt-8 space-y-6">
          <SelectableOption
            label="Sizing"
            description="The sizing tool aims to guide you to find your correct product size."
            selected={goingTo === "sizing"}
            onClick={() =>
              delayedNav("sizing", null, () => alert("Sizing page coming soon"))
            }
          />

          <SelectableOption
            label="Assistance"
            description="The assistance tool will help you resolve product issues."
            selected={goingTo === "assistance"}
            onClick={() =>
              delayedNav("assistance", null, () =>
                alert("Assistance page coming soon")
              )
            }
          />

          <SelectableOption
            label="Return"
            description="Use this tool if you want to return a product"
            selected={goingTo === "return"}
            onClick={() => delayedNav("return", "/return")}
          />

          <SelectableOption
            label="FAQ"
            description="Use this tool to get answers to your questions"
            selected={goingTo === "faq"}
            onClick={() =>
              delayedNav("faq", null, () => alert("FAQ page coming soon"))
            }
          />
        </div>

        <div className="mt-20">
          <SelectableOption
            label="Recommendation"
            description="Use this tool to get recommendations based on your problems"
            variant="solid"
            selected={goingTo === "recommendation"} // optional; doesn't change styling much in solid
            onClick={() => navigate("/recommendation")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
