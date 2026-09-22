import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TLSingleVac from "../../../../assets/lengths/TT/SingleVac.svg";
import TLMultiVac from "../../../../assets/lengths/TT/MultiVac.svg";
import ExclamationIcon from "../../../../assets/exclamation.svg";

export default function LengthVac() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  // Loaded both "pages" and "common" namespaces
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve selected suspension option from localStorage
  const suspension = localStorage.getItem("suspension");
  const isMultiSeal = suspension === "TT-multi-seal";

  // Dynamic description and image selection based on suspension type
  const descriptionKey = isMultiSeal
    ? "lengthTTVacSizing.descriptionMulti"
    : "lengthTTVacSizing.descriptionSingle";

  const selectedImage = isMultiSeal ? TLMultiVac : TLSingleVac;

  const handleConfirm = (res) => {
    setResult(res);
    localStorage.setItem("length", res);
    
    setTimeout(() => {
      navigate("/sizing/TTorientation");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTcircumference-vac" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTTVacSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey={descriptionKey}
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.length_tt_vac")}
            className="w-70 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="w-full">
          <MeasurementInput
            product="ttdistal"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>

        {/* Notice Section - Matching the design from Length.jsx */}
        <div className="w-full max-w-sm mx-auto mt-8">
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt={t("common:popup.notice_title")}
                className="shrink-0 w-5 h-5 opacity-100"
              />

              <div className="flex-1">
                <p className="text-base font-bold text-slate-900 leading-tight">
                  {t("lengthTTVacSizing.note_title")}
                </p>

                <p className="mt-2 text-sm text-slate-600 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey="lengthTTVacSizing.note_body"
                    components={{ 
                      bold: <strong className="font-bold text-black" />,
                      underline: <span className="underline" />,
                      br: <br />
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}