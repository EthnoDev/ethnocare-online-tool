import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TLPin from "../../../../assets/lengths/TT/pin.svg";
import ExclamationIcon from "../../../../assets/exclamation.svg";

export default function Length() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  const { t } = useTranslation(["pages", "common"]);

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
      backTo="/sizing/TTcircumference" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTTSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey="lengthTTSizing.description"
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={TLPin}
            alt={t("common:pages.length_tt")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="w-full">
          <MeasurementInput
            product="ttstandard"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>

        {/* Note Section - Specific to Length Measurement */}
        <div className="w-full max-w-sm mx-auto mt-10">
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt={t("common:popup.notice_title")}
                className="shrink-0 w-5 h-5 opacity-100"
              />

              <div className="flex-1">
                <p className="text-base font-bold text-slate-900 leading-tight">
                  {t("lengthTTSizing.note_title")}
                </p>

                <p className="mt-1.5 text-sm text-slate-600 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey="lengthTTSizing.note_body"
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