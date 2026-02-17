// src/pages/return/Identification.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

export default function Identification() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // "user" | "distributor"

  const handleSelect = (key) => {
    if (selected) return; // prevent double clicks
    setSelected(key);

    setTimeout(() => {
      // TODO: replace these with your real next pages
      //if (key === "user") navigate("/return/user"); 
      //if (key === "distributor") navigate("/return/distributor");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/return"
      code={true}
      currentStep={1}
      totalSteps={3}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          Identification
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          Are you a user/clinic or a distributor?
        </p>

        <div className="mt-8 space-y-5 flex flex-col items-center">
          <SelectableOption
            label="User / Clinic"
            selected={selected === "user"}
            onClick={() => handleSelect("user")}
          />

          <SelectableOption
            label="Distributor"
            selected={selected === "distributor"}
            onClick={() => handleSelect("distributor")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
