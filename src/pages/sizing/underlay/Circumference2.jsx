import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";
import RedirectionPopup from "../../../components/UnderlayRedirectionPopup";

// Assets
import Circumference2Img from "../../../assets/circumferences/Underlay/Circumference2.svg";

export default function Circumference2() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);
  const [showRedirectionPopup, setShowRedirectionPopup] = useState(false);

  const handleConfirm = (res) => {
    if (res === "override-closed") {
      setShowRedirectionPopup(true);
    } else {
      // keep-open → navigate forward
      setTimeout(() => navigate("/sizing/underlay/length"), 200);
    }
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/circumference" 
      currentStep={3} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumference2UnderlaySizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumference2UnderlaySizing.description")}
        </p>

        {/* 3. Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={Circumference2Img}
            alt={t("pages.circumference2_udtt", { ns: "common" })}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
          <MeasurementInput
            product="underlaytt"
            measurement="circumference2"
            onConfirm={handleConfirm}
          />
        </div>
      </div>

      {/* Redirection Popup */}
      {showRedirectionPopup && (
        <RedirectionPopup
          onClose={() => setShowRedirectionPopup(false)}
          onRedirect={() => {
            localStorage.setItem("underlay_seal", "closed-seal");
            navigate("/sizing/underlay/length");
          }}
        />
      )}
    </PageWrapper>
  );
}