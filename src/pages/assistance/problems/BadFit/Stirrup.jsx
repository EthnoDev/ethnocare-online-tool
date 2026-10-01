// src/pages/assistance/problems/BadFit/Stirrup.jsx
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";

// assets
import StirrupImg from "../../../../assets/stirrup.svg";

export default function Stirrup() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/problem/bad-fit/moving"
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("stirrupAssistance.title")}
        </h1>

        {/* Content Container */}
        <div className="mt-8 flex flex-col items-center">
          
          {/* Illustrated Asset Box */}
          <div className="rounded-xl overflow-hidden flex">
            <img
              src={StirrupImg}
              alt="Stirrup"
              className="w-70 h-auto block rounded-xl object-contain"
            />
          </div>

          {/* Description Text block (Formatted precisely like reference file) */}
          <div className="mt-2 text-center">
            <p className="text-sm max-w-xs leading-snug text-slate-500 italic">
              {t("stirrupAssistance.imageDescription")}
            </p>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}