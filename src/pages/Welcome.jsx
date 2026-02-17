import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SelectableOption from "../components/SelectableOption";
import RedirectLogo from "../assets/redirect-logo.svg";

export default function Welcome() {
  const navigate = useNavigate();
  const [goingTo, setGoingTo] = useState(null);

  const delayedNav = (key, action) => {
    if (goingTo) return;
    setGoingTo(key);

    setTimeout(() => {
      action?.();
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
            onClick={() => delayedNav("sizing", () => navigate("/sizing"))}
          />

          <SelectableOption
            label="Assistance"
            description="The assistance tool will help you resolve product issues."
            selected={goingTo === "assistance"}
            onClick={() => delayedNav("assistance", () => navigate("/assistance"))}
          />

          <SelectableOption
            label="Return"
            description="Use this tool if you want to return a product"
            selected={goingTo === "return"}
            onClick={() => delayedNav("return", () => navigate("/return"))}
          />

          <SelectableOption
            label={
              <span className="flex items-center justify-center gap-2">
                <span>FAQ</span>
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className={`h-4 w-4 transition-colors ${
                    goingTo === "faq"
                      ? "brightness-0 invert" // turns SVG white
                      : "opacity-100"
                  }`}
                />
              </span>
            }
            description="Use this tool to get answers to your questions"
            selected={goingTo === "faq"}
            onClick={() =>
              delayedNav("faq", () => {
                window.open(
                  "https://ethnocare.ca/pages/information",
                  "_blank",
                  "noopener,noreferrer"
                );
                setGoingTo(null);
              })
            }
          />
        </div>

        <div className="mt-20">
          <SelectableOption
            label="Recommendation"
            description="Use this tool to get recommendations based on your problems"
            variant="solid"
            selected={goingTo === "recommendation"}
            onClick={() =>
              delayedNav("recommendation", () =>
                navigate("/recommendation")
              )
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
}
