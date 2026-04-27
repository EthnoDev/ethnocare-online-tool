import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function EmailCapture({
  onConfirm,
  defaultEmail = "",
  selection = {}, // expects { sizeCode, product }
}) {
  const { t } = useTranslation(["common", "errors"]);
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateEmail(email)) {
      setError(t("invalid_email", { ns: "errors" }));
      return;
    }

    setIsSubmitting(true); // blue fill

    try {
      // Keep your local persistence
      localStorage.setItem("overlay_email", email.trim());
      if (onConfirm) onConfirm(email.trim());

      // Prepare the minimal payload for HubSpot
      const sizeCode =
        selection.sizeCode || localStorage.getItem("overlay_saved_size_code") || "";
      const product =
        selection.product || localStorage.getItem("overlay_product") || "";

      // ---- HubSpot Forms API config ----
      // Put these in your .env.local (Vite uses VITE_ prefix client-side):
      // VITE_HS_PORTAL_ID=12345678
      // VITE_HS_FORM_GUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      const portalId = import.meta.env.VITE_HS_PORTAL_ID;
      const formGuid = import.meta.env.VITE_HS_FORM_GUID;

      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

      // Standard HubSpot "fields" payload; property names must exist in HubSpot
      const payload = {
        fields: [
          { name: "email", value: email.trim() },
          { name: "overlay_size_code", value: sizeCode }, // create this property in HS
          { name: "overlay_product", value: product },    // create this property in HS
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title || "Ethnocare Sizing Widget",
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "HubSpot submission failed");
      }

      // match your 200ms “fill” before swapping to success
      setTimeout(() => {
        setSent(true);
        setIsSubmitting(false);
      }, 200);
    } catch (err) {
      console.error("[EmailCapture] HubSpot error:", err);
      setError(t("submit_failed", { ns: "errors" }));
      setIsSubmitting(false);
    }
  };

  const xfade = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.98 },
    transition: { type: "tween", ease: "easeInOut", duration: 0.35 },
  };

  return (
    <div className="relative w-full mx-0">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="success"
            layout
            {...xfade}
            role="status"
            aria-live="polite"
            className="min-h-[42px] w-full rounded-xl bg-gray-200 text-gray-800 font-sans text-sm font-semibold
                       px-4 py-2 flex items-center justify-center text-center leading-snug"
          >
            {t("email.success", { ns: "common" })}
          </motion.div>
        ) : (
          <motion.form key="form" layout onSubmit={handleSubmit} noValidate {...xfade} className="relative z-0 space-y-2">
            <div className="flex items-stretch gap-2">
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder={t("email.placeholder", { ns: "common" })}
                className="min-w-0 flex-1 h-[42px] px-4 border border-gray-300 hover:border-black rounded-xl
                           font-sans text-base leading-none appearance-none focus:outline-none"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`relative h-[42px] px-6 rounded-xl border font-sans text-base font-semibold leading-none shrink-0
                            transition-colors duration-200
                            ${isSubmitting
                              ? "bg-[#090C41] text-white border-[#090C41]"
                              : "bg-white text-black border-gray-300 hover:border-black"}`}
              >
                {/* keep width stable */}
                <span className="invisible">...</span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
                    isSubmitting ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {t("email.send", { ns: "common" })}
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 delay-150 ${
                    isSubmitting ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ...
                </span>
              </button>
            </div>
            {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
