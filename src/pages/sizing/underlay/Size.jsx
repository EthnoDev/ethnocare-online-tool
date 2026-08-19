// src/pages/assistance/underlay/SizeUnderlay.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import EmailCapture from "../../../components/EmailCapture";

// Assets
import ClosedUnderlayImg from "../../../assets/products/closedUnderlay.png";
import OpenUnderlayImg from "../../../assets/products/openUnderlay.png";
import ExclamationIcon from "../../../assets/exclamation.svg";

// Dynamic Note Images
import ClosedImperialImg from "../../../assets/underlayXtra/closedImperial.svg";
import ClosedMetricImg from "../../../assets/underlayXtra/closedMetric.svg";
import OpenImperialImg from "../../../assets/underlayXtra/openImperial.svg";
import OpenMetricImg from "../../../assets/underlayXtra/openMetric.svg";

export default function SizeUnderlay() {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const { t } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const units = localStorage.getItem("units");
  const unit = units === "imperial" ? "in" : "cm";

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

  const lengthMapped =
    localStorage.getItem("underlay_length") || "—";

  const lengthRaw =
    localStorage.getItem("raw_length") || "—";

  /** ---------- Note Logic & Content ---------- */
  const isClosed = sealId === "closed-seal";
  const isImperial = units === "imperial";

  const getNoteImage = () => {
    if (isClosed) {
      return isImperial ? ClosedImperialImg : ClosedMetricImg;
    }
    return isImperial ? OpenImperialImg : OpenMetricImg;
  };

  const noteImage = getNoteImage();

  const noteKey = isClosed
    ? "UnderlaySizing.note_body_closed"
    : "UnderlaySizing.note_body_open";

  const noteAltKey = isClosed
    ? "common:popup.underlay_closed_title"
    : "common:popup.underlay_open_title";

  const measurement = isClosed
    ? (isImperial ? "2 in" : "5 cm")
    : (isImperial ? "4 in" : "10 cm");

  /** ---------- Logic & Formatting ---------- */
  const productAmputation = t("common:products.underlay tt");

  const sealLabel =
    sealId !== "—"
      ? t(`seal.${sealId.toLowerCase()}`, { ns: "common" })
      : "—";

  const sizeCode =
    circumferenceMapped !== "—" && lengthMapped !== "—"
      ? `UDTT-${circumferenceMapped}-${lengthMapped}${
          isClosed ? "-C" : ""
        }`
      : "UDTT-XX-XX";

  const backTo = isClosed
    ? "/sizing/underlay/circumference"
    : "/sizing/underlay/length";

  const currentStep = isClosed ? 4 : 5;

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
          <p className="text-4xl font-bold font-sans">
            {sizeCode}
          </p>
        </div>

        {/* 3. Product Summary Card */}
        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-8">
          <img
            src={isClosed ? ClosedUnderlayImg : OpenUnderlayImg}
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

              {!isClosed && (
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

        {/* 4. Note Section */}
        <div className="w-full max-w-md mx-auto mt-2 mb-10">
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt={t("common:popup.notice_title")}
                className="shrink-0 w-5 h-5 opacity-100"
              />

              <div className="flex-1">
                <p className="text-md font-bold text-slate-900 leading-tight">
                  {t("UnderlaySizing.note_title")}
                </p>

                <p className="mt-1.5 text-sm text-slate-600 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey={noteKey}
                    values={{ measurement }}
                    components={{
                      bold: (
                        <strong className="font-bold text-black" />
                      ),
                    }}
                  />
                </p>

                {/* Dynamic Diagram Image */}
                <div className="mt-4 flex justify-center">
                  <img
                    src={noteImage}
                    alt={t(noteAltKey)}
                    className="w-full max-w-[140px] h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Email Capture Section */}
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