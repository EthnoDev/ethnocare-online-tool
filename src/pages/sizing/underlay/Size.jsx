// src/pages/assistance/underlay/SizeUnderlay.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import EmailCapture from "../../../components/EmailCapture";

// Assets
import ClosedUnderlayImg from "../../../assets/products/closedUnderlay.png";
import OpenUnderlayImg from "../../../assets/products/openUnderlay.png";

export default function SizeUnderlay() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const { t } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";

  // Amputation label formatting
  const rawAmputation = localStorage.getItem("amputation") || "tt";
  const amputation =
    rawAmputation.charAt(0).toUpperCase() +
    rawAmputation.slice(1).toLowerCase();

  const sealId = localStorage.getItem("underlay_seal") || "—";

  const circumferenceRaw =
    localStorage.getItem("raw_circumference") || "—";

  const circumference2Raw =
    localStorage.getItem("raw_circumference2") || "—";

  const circumferenceMapped =
    localStorage.getItem("underlay_circumference") || "—";

  const lengthRaw =
    localStorage.getItem("raw_length") || "—";

  const lengthMapped =
    localStorage.getItem("underlay_length") || "—";

  /** ---------- Logic & Formatting ---------- */
  const productAmputation = t("common:products.underlay tt");

  const sealLabel =
    sealId !== "—"
      ? t(`seal.${sealId.toLowerCase()}`, { ns: "common" })
      : "—";

  const sizeCode =
    circumferenceMapped !== "—" && lengthMapped !== "—"
      ? `UDTT-${circumferenceMapped}-${lengthMapped}${
          sealId === "closed-seal" ? "-C" : ""
        }`
      : "UDTT-XX-XX";

  const backTo =
    sealId === "closed-seal"
      ? "/sizing/underlay/circumference"
      : "/sizing/underlay/length";

  const currentStep =
    sealId === "closed-seal" ? 4 : 5;

  /** ---------- Shopify Variant Mapping ---------- */
  const openVariantMap = {
    "23-SH": "52355990815039",
    "23-MD": "52355990683967",
    "23-LG": "52355990749503",
    "23-XL": "52355990815039",

    "28-SH": "52355990880575",
    "28-MD": "52355990946111",
    "28-LG": "52355991011647",
    "28-XL": "52355991077183",

    "35-SH": "52355991142719",
    "35-MD": "52355991208255",
    "35-LG": "52355991273791",
    "35-XL": "52355991339327",
  };

  const closedVariantMap = {
    "23-SH": "52286325981503",
    "23-LG": "52286326047039",

    "28-SH": "52286326112575",
    "28-LG": "52286326178111",

    "35-SH": "52286326243647",
    "35-LG": "52286326309183",
  };

  /** ---------- Buy Now ---------- */
  const handleConfirmClick = () => {
    setIsConfirming(true);

    if (
      circumferenceMapped !== "—" &&
      lengthMapped !== "—" &&
      sealId !== "—"
    ) {
      const key = `${circumferenceMapped}-${lengthMapped}`;
      const isClosed = sealId === "closed-seal";

      const variantId = isClosed
        ? closedVariantMap[key]
        : openVariantMap[key];

      const productUrl = isClosed
        ? "https://ethnocare.ca/products/underlay-transtibial-closed"
        : "https://ethnocare.ca/products/underlay-transtibial-open";

      if (variantId) {
        setTimeout(() => {
          window.open(
            `${productUrl}?variant=${variantId}`,
            "_blank"
          );

          setIsConfirming(false);
        }, 200);
      } else {
        alert("No matching product found for the selected values.");
        setIsConfirming(false);
      }
    } else {
      alert("Missing size data. Please complete all steps.");
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
      backTo={backTo}
      currentStep={currentStep}
      code={true}
    >
      <div className="w-full max-w-2xl text-center">

        {/* 1. Title */}
        <h1 className="text-3xl font-semibold font-sans mb-2 text-slate-900">
          {t("UnderlaySizing.title")}
        </h1>

        {/* 2. Primary Size Code */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-4xl font-bold font-sans text-[#090C41]">
            {sizeCode}
          </p>
        </div>

        {/* 3. Product Summary Card */}
        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-10">
          <img
            src={
              sealId === "closed-seal"
                ? ClosedUnderlayImg
                : OpenUnderlayImg
            }
            alt={t("common:products.underlay tt")}
            className="w-[180px] h-auto object-contain rounded-xl"
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">

            <div className="space-y-1">
              <p className="text-slate-900">
                <strong>
                  {t("UnderlaySizing.description")}
                </strong>
              </p>

              <p>
                {t("UnderlaySizing.amp")}: {amputation}
              </p>

              <p>
                {t("UnderlaySizing.seal")}: {sealLabel}
              </p>

              <p>
                {t("UnderlaySizing.circumference")}:{" "}
                {circumferenceRaw} {unit}
              </p>

              {sealId === "open-seal" && (
                <p>
                  {t("UnderlaySizing.circumference2")}:{" "}
                  {circumference2Raw} {unit}
                </p>
              )}

              <p>
                {t("UnderlaySizing.length")}:{" "}
                {lengthRaw} {unit}
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
                {t("cta.buy", { ns: "common" })}Underlay TT
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

        {/* 4. Email Capture Section */}
        <div className="mt-10 text-left font-sans max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("UnderlaySizing.email_title")}
          </h2>

          <p className="text-xs text-gray-700 leading-snug mb-2">
            {t("UnderlaySizing.email_description")}
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
                "Underlay Result saved for:",
                email
              );
            }}
          />
        </div>

      </div>
    </PageWrapper>
  );
}