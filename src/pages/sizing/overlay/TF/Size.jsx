// src/pages/assistance/overlay/TF/SizeTF.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import EmailCapture from "../../../../components/EmailCapture";

// Assets
import TFProductImg from "../../../../assets/products/tf.png";
import ExclamationIcon from "../../../../assets/exclamation.svg";

export default function SizeTF() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const { t, i18n } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const rawAmputation = localStorage.getItem("amputation") || "tf";

  let amputation =
    rawAmputation.charAt(0).toUpperCase() +
    rawAmputation.slice(1).toLowerCase();

  if (
    amputation.toLowerCase() === "transfemoral" &&
    i18n.language.startsWith("fr")
  ) {
    amputation = "Transfémoral";
  }

  const product = localStorage.getItem("product") || "Overlay";
  const suspensionId = localStorage.getItem("suspension") || "—";

  const circumferenceMapped =
    localStorage.getItem("tfstandard_circumference") ||
    localStorage.getItem("tfdistal_circumference") ||
    "—";

  const circumferenceRaw =
    localStorage.getItem("raw_circumference") || "—";

  const lengthMapped =
    localStorage.getItem("tfstandard_length") ||
    localStorage.getItem("tfdistal_length") ||
    "—";

  const lengthRaw =
    localStorage.getItem("raw_length") || "—";

  const unit =
    localStorage.getItem("units") === "imperial" ? "in" : "cm";

  /** ---------- Logic & Formatting ---------- */
  const currentLang = (i18n.language || "en").split("-")[0];

  const productAmputation = t("common:products.tf");

  const isDistalSeal = suspensionId === "TF-distal-seal";
  const isCushion = suspensionId === "TF-cushion";

  const suffix = isDistalSeal ? "VAC" : "PIN";

  const suspensionLabel =
    suspensionId !== "—"
      ? t(`suspension.${suspensionId.toLowerCase()}`, {
          ns: "common",
        })
      : "—";

  const sizeCode =
    circumferenceMapped !== "—" &&
    lengthMapped !== "—"
      ? `OVTF-${circumferenceMapped}-${lengthMapped}-${suffix}`
      : "XXXXX";

  const germanSizeMap = {
    "OVTF-32-XL-PIN": "211B27=1L1",
    "OVTF-38-XL-PIN": "211B27=1L2",
    "OVTF-40-XL-PIN": "211B27=1L3",
    "OVTF-44-XL-PIN": "211B27=1L4",
    "OVTF-48-XL-PIN": "211B27=1L5",
    "OVTF-52-XL-PIN": "211B27=1L6",

    "OVTF-32-LG-PIN": "211B27=1M1",
    "OVTF-38-LG-PIN": "211B27=1M2",
    "OVTF-40-LG-PIN": "211B27=1M3",
    "OVTF-44-LG-PIN": "211B27=1M4",
    "OVTF-48-LG-PIN": "211B27=1M5",
    "OVTF-52-LG-PIN": "211B27=1M6",

    "OVTF-32-SH-PIN": "211B27=1S1",
    "OVTF-38-SH-PIN": "211B27=1S2",
    "OVTF-40-SH-PIN": "211B27=1S3",
    "OVTF-44-SH-PIN": "211B27=1S4",
    "OVTF-48-SH-PIN": "211B27=1S5",
    "OVTF-52-SH-PIN": "211B27=1S6",

    "OVTF-32-LG-VAC": "211B27=2M1",
    "OVTF-38-LG-VAC": "211B27=2M2",
    "OVTF-40-LG-VAC": "211B27=2M3",
    "OVTF-44-LG-VAC": "211B27=2M4",
    "OVTF-48-LG-VAC": "211B27=2M5",
    "OVTF-52-LG-VAC": "211B27=2M6",

    "OVTF-32-SH-VAC": "211B27=2S1",
    "OVTF-38-SH-VAC": "211B27=2S2",
    "OVTF-40-SH-VAC": "211B27=2S3",
    "OVTF-44-SH-VAC": "211B27=2S4",
    "OVTF-48-SH-VAC": "211B27=2S5",
    "OVTF-52-SH-VAC": "211B27=2S6",
  };

  const germanAltCode =
    currentLang === "de"
      ? germanSizeMap[sizeCode] || ""
      : "";

  /** ---------- Shopify Variant Mapping ---------- */
  const variantKey =
    `${suffix}-${lengthMapped}-${circumferenceMapped}`;

  const variantMap = {
    "PIN-SH-32": "50916153360703",
    "PIN-SH-38": "50916153393471",
    "PIN-SH-40": "50916153426239",
    "PIN-SH-44": "50916153459007",
    "PIN-SH-48": "50916153491775",
    "PIN-SH-52": "50916153524543",

    "PIN-LG-32": "50916153557311",
    "PIN-LG-38": "50916153590079",
    "PIN-LG-40": "50916153622847",
    "PIN-LG-44": "50916153655615",
    "PIN-LG-48": "50916153688383",
    "PIN-LG-52": "50916153721151",

    "PIN-XL-32": "50916153753919",
    "PIN-XL-38": "50916153786687",
    "PIN-XL-40": "50916153819455",
    "PIN-XL-44": "50916153852223",
    "PIN-XL-48": "50916153884991",
    "PIN-XL-52": "50916153917759",

    "VAC-SH-32": "50916153950527",
    "VAC-SH-38": "50916153983295",
    "VAC-SH-40": "50916154016063",
    "VAC-SH-44": "50916154048831",
    "VAC-SH-48": "50916154081599",
    "VAC-SH-52": "50916154114367",

    "VAC-LG-32": "50916154147135",
    "VAC-LG-38": "50916154179903",
    "VAC-LG-40": "50916154212671",
    "VAC-LG-44": "50916154245439",
    "VAC-LG-48": "50916154278207",
    "VAC-LG-52": "50916154310975",
  };

  /** ---------- Buy Now ---------- */
  const handleConfirmClick = () => {
    setIsConfirming(true);

    if (
      circumferenceMapped !== "—" &&
      lengthMapped !== "—"
    ) {
      const variantId = variantMap[variantKey];

      if (variantId) {
        setTimeout(() => {
          window.open(
            `https://ethnocare.ca/products/overlay-transfemoral?variant=${variantId}`,
            "_blank"
          );

          setIsConfirming(false);
        }, 200);
      } else {
        alert(
          "No matching product found for the selected values."
        );
        setIsConfirming(false);
      }
    } else {
      alert(
        "Missing size data. Please complete all steps."
      );
      setIsConfirming(false);
    }
  };

  /** ---------- Restart ---------- */
  const handleRestart = () => {
    setIsRestarting(true);

    setTimeout(() => {
      navigate("/sizing/product");
    }, 200);
  };

  return (
    <PageWrapper
      showBack
      backTo={
        isDistalSeal
          ? "/sizing/TFcircumference-vac"
          : "/sizing/TFcircumference"
      }
      currentStep={4}
      totalSteps={4}
      code={true}
    >
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-semibold font-sans mb-2 text-slate-900">
          {t("TFSizing.title")}
        </h1>

        <div className="flex flex-col items-center mb-6">
          <p className="text-4xl font-bold font-sans text-[#090C41]">
            {sizeCode}
          </p>

          {germanAltCode && (
            <p className="text-xl font-bold text-gray-500 font-sans -mt-2">
              {germanAltCode}
            </p>
          )}
        </div>

        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-8">
          <img
            src={TFProductImg}
            alt={t("common:products.tf")}
            className="w-[180px] h-auto object-contain rounded-xl"
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">
            <div className="space-y-1">
              <p className="text-slate-900">
                <strong>{t("TFSizing.description")}</strong>
              </p>

              <p>
                {t("TFSizing.amp")}: {amputation}
              </p>

              <p>
                {t("TFSizing.system")}: {suspensionLabel}
              </p>

              <p>
                {t("TFSizing.circumference")}: {circumferenceRaw} {unit}
              </p>

              <p>
                {t("TFSizing.length")}: {lengthRaw} {unit}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-3 w-full">
              <button
                onClick={handleConfirmClick}
                className={`px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer
                  ${
                    isConfirming
                      ? "bg-[#090C41] text-white border-[#090C41]"
                      : "bg-black text-white border-black hover:bg-[#090C41]"
                  }`}
              >
                {t("cta.buy", { ns: "common" })}Overlay TF
              </button>

              <button
                onClick={handleRestart}
                className={`px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer
                  ${
                    isRestarting
                      ? "bg-[#090C41] text-white border-[#090C41]"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
              >
                {t("cta.restart", { ns: "common" })}
              </button>
            </div>
          </div>
        </div>

        {/* Cushion Specific Note */}
        {isCushion && (
          <div className="w-full max-w-md mx-auto mt-2 mb-10">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
              <div className="flex items-start gap-3 text-left">
                <img
                  src={ExclamationIcon}
                  alt={t("common:popup.notice_title")}
                  className="shrink-0 w-5 h-5"
                />

                <div className="flex-1">
                  <p className="text-md font-bold text-slate-900 leading-tight">
                    {t("TFSizing.note_cushion_title")}
                  </p>

                  <p className="mt-1.5 text-sm text-slate-600 leading-snug">
                    <Trans
                      ns="pages"
                      i18nKey="TFSizing.note_cushion_body"
                      components={{
                        bold: (
                          <strong className="font-bold underline text-[#090C41]" />
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 text-left font-sans max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("TFSizing.email_title")}
          </h2>

          <p className="text-xs text-gray-700 leading-snug mb-2">
            {t("TFSizing.email_description")}
          </p>

          <EmailCapture
            selection={{
              sizeCode,
              product: productAmputation,
            }}
            onConfirm={(email) => {
              localStorage.setItem(
                "saved_size_code",
                sizeCode
              );

              console.log(
                "TF Result saved for:",
                email
              );
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
}