// src/pages/assistance/SizeSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SelectableOption from "../../components/SelectableOption";

export default function AssistanceSizeSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  // We might need to know which product was selected to show specific sizes
  const product = localStorage.getItem("product"); 

  const handleSelect = (size) => {
    if (isRouting) return;

    setSelected(size);
    setIsRouting(true);
    
    // Save the size selection
    localStorage.setItem("product_size", size);

    setTimeout(() => {
      // Navigate to the next step in your assistance flow
      // navigate("/assistance/next-step");
      setIsRouting(false);
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/selection" 
      code={true}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("sizeAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("sizeAssistance.description")}
        </p>
      </div>
    </PageWrapper>
  );
}