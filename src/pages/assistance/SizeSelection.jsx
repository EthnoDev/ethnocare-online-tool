// src/pages/assistance/SizeSelection.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SelectableOption from "../../components/SelectableOption";
import SelectableOption2 from "../../components/SelectableOption2";

export default function AssistanceSizeSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  const product = localStorage.getItem("product");
  const amputation = localStorage.getItem("amputation");

  // TT state
  const [circumference, setCircumference] = useState(null);
  const [length, setLength] = useState(null);
  const [side, setSide] = useState(null);

  // TF-only state
  const [suspension, setSuspension] = useState(null);

  const [errors, setErrors] = useState({});
  const [confirmSelected, setConfirmSelected] = useState(false);
  const [isRouting, setIsRouting] = useState(false);

  const refCirc = useRef(null);
  const refLen  = useRef(null);
  const refSide = useRef(null);
  const refSusp = useRef(null);

  const Group = ({ title, error, sectionRef, children }) => (
    <section ref={sectionRef} className="w-full text-left" aria-invalid={!!error}>
      <h2 className="font-semibold text-[18px] mb-2">{title}</h2>
      <div className="flex flex-wrap gap-3">{children}</div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </section>
  );

  const validate = () => {
    const next = {};

    if (!circumference) next.circumference = t("sizeTt.errorCircumference", "Please choose a circumference.");
    if (!length)        next.length        = t("sizeTt.errorLength",        "Please choose a length.");

    if (amputation === "transtibial" && !side)
      next.side = t("sizeTt.errorSide", "Please choose a side.");

    if (amputation === "transfemoral" && !suspension)
      next.suspension = t("sizeTf.errorSuspension", "Please choose a suspension.");

    setErrors(next);

    if (!circumference) return refCirc.current;
    if (!length)        return refLen.current;
    if (amputation === "transtibial"  && !side)       return refSide.current;
    if (amputation === "transfemoral" && !suspension) return refSusp.current;
    return null;
  };

  const handleConfirm = () => {
    if (isRouting) return;

    setConfirmSelected(true);
    setTimeout(() => setConfirmSelected(false), 200);

    const firstErrorEl = validate();
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    localStorage.setItem("product_circumference", circumference);
    localStorage.setItem("product_length", length);

    if (amputation === "transtibial") {
      const code = `OV-${circumference}-${length}-${side.charAt(0).toUpperCase()}`;
      localStorage.setItem("product_code", code);
      localStorage.setItem("product_side", side);
    } else {
      const code = `OVTF-${circumference}-${length}-${suspension}`;
      localStorage.setItem("product_code", code);
      localStorage.setItem("product_suspension", suspension);
    }

    setIsRouting(true);
    setTimeout(() => {
      navigate("/assistance/next-step"); // update to your actual next route
      setIsRouting(false);
    }, 200);
  };

  const handleSkip = () => {
    if (isRouting) return;
    setIsRouting(true);
    localStorage.setItem("product_code", "N/A");
    setTimeout(() => {
      navigate("/assistance/next-step"); // update to your actual next route
      setIsRouting(false);
    }, 200);
  };

  const circumferenceOptions = amputation === "transfemoral"
    ? ["32", "38", "40", "44", "48", "52"]
    : ["23", "28", "35"];

  const lengthOptions = amputation === "transfemoral"
    ? ["SH", "LG", "XL"]
    : ["SH", "LG"];

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

        <div className="mt-6 space-y-6">
        {/* Circumference */}
        <Group title={t("sizeTt.circumference")} error={errors.circumference} sectionRef={refCirc}>
          {circumferenceOptions.map((val) => (
            <SelectableOption2
              key={val}
              label={val}
              selected={circumference === val}
              onClick={() => {
                setCircumference(val);
                if (errors.circumference) setErrors((e) => ({ ...e, circumference: "" }));
              }}
              className="w-24 h-10 shrink-0 text-sm"
            />
          ))}
        </Group>

        {/* Length */}
        <Group title={t("sizeTt.length")} error={errors.length} sectionRef={refLen}>
          {lengthOptions.map((val) => (
            <SelectableOption2
              key={val}
              label={val}
              selected={length === val}
              onClick={() => {
                setLength(val);
                if (errors.length) setErrors((e) => ({ ...e, length: "" }));
              }}
              className="w-24 h-10 shrink-0 text-sm"
            />
          ))}
        </Group>

        {/* Side — transtibial only */}
        {amputation === "transtibial" && (
          <Group title={t("sizeTt.side")} error={errors.side} sectionRef={refSide}>
            {["Left", "Right"].map((val) => (
              <SelectableOption2
                key={val}
                label={val}
                selected={side === val}
                onClick={() => {
                  setSide(val);
                  if (errors.side) setErrors((e) => ({ ...e, side: "" }));
                }}
                className="w-28 h-10 shrink-0 text-sm"
              />
            ))}
          </Group>
        )}

        {/* Suspension — transfemoral only */}
        {amputation === "transfemoral" && (
          <Group title={t("pages:sizeTf.suspension")} error={errors.suspension} sectionRef={refSusp}>
            {["PIN", "VAC"].map((val) => (
              <SelectableOption2
                key={val}
                label={val}
                selected={suspension === val}
                onClick={() => {
                  setSuspension(val);
                  if (errors.suspension) setErrors((e) => ({ ...e, suspension: "" }));
                }}
                className="w-28 h-10 shrink-0 text-sm"
              />
            ))}
          </Group>
        )}
        </div>

        <div className="h-14" />

        <SelectableOption
          label={t("common:cta.confirm")}
          selected={confirmSelected}
          onClick={handleConfirm}
        />

        <button
          type="button"
          onClick={handleSkip}
          className="w-full py-3 rounded-xl text-gray-400 hover:text-gray-600 transition"
        >
          {t("common:cta.skip")}
        </button>
      </div>
    </PageWrapper>
  );
}