// components/ContactForm.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SelectableOption from "./SelectableOption";
import { useTranslation } from "react-i18next";

export default function ContactForm({
  onSubmit,
  className = "",
  buttonLabel, // optional override; if undefined we use i18n
  summary, // { heading?, product?, issue?, detail? }
}) {
  const { t } = useTranslation("common");

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sendSelected, setSendSelected] = useState(false);
  const [errors, setErrors] = useState({ message: "", email: "" });

  // submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const emailOk = (val) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

  const handleSend = async () => {
    setSubmitError("");
    setSent(false);

    // validate inputs
    const nextErrors = { message: "", email: "" };
    if (!message.trim()) {
      nextErrors.message = t(
        "contactForm.errorMessageRequired",
        "Please enter a message."
      );
    }
    if (!email.trim()) {
      nextErrors.email = t(
        "contactForm.errorEmailRequired",
        "Please enter an email."
      );
    } else if (!emailOk(email)) {
      nextErrors.email = t(
        "contactForm.errorEmailInvalid",
        "Please enter a valid email."
      );
    }
    setErrors(nextErrors);
    if (nextErrors.message || nextErrors.email) return;

    // button tap feedback
    setSendSelected(true);
    setTimeout(() => setSendSelected(false), 200);

    // optional callback to parent
    onSubmit?.({ message, email });

    // HubSpot Forms API
    const portalId = import.meta.env.VITE_HS_PORTAL_ID;
    const formGuid = import.meta.env.VITE_HS_FORM_GUID; // ensure this env var exists
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const overlaySizeCode = localStorage.getItem("product_code") || "N/A";
    const problem = localStorage.getItem("problem") || "N/A";
    const detail = localStorage.getItem("detail") || "N/A";

    const payload = {
      fields: [
        { name: "email", value: email.trim() },
        { name: "message", value: message.trim() }, // make sure 'message' is a field in the HubSpot form
        { name: "overlay_size_code", value: overlaySizeCode },
        { name: "overlay_problem", value: problem },
        { name: "overlay_detail", value: detail },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title || "Ethnocare Widget",
      },
    };

    try {
      setIsSubmitting(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message || `HubSpot submission failed (${res.status})`
        );
      }

      // success → clear inputs then show success panel
      setMessage("");
      setEmail("");
      setSent(true);
    } catch (err) {
      console.error("[ContactForm] HubSpot error:", err);
      setSubmitError(
        t(
          "contactForm.submitError",
          "We couldn't send your message. Please try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const xfade = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.98 },
    transition: { type: "tween", ease: "easeInOut", duration: 0.35 },
  };

  const computedButtonLabel =
    buttonLabel || t("contactForm.buttonSend", "Send");

  return (
    <div className={`text-left ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          // SUCCESS STATE — everything else is hidden
          <motion.div
            key="success"
            {...xfade}
            role="status"
            aria-live="polite"
            className="min-h-[42px] w-full rounded-md bg-gray-200 text-gray-800 font-sans text-sm font-semibold
                       px-4 py-2 flex items-center justify-center text-center leading-snug"
          >
            {t(
              "contactForm.success",
              "Thank you! Your message has been received."
            )}
          </motion.div>
        ) : (
          // FORM + SUMMARY + BUTTON
          <motion.div key="form" {...xfade} className="space-y-2">
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              {/* Message */}
              <label htmlFor="assist-message" className="sr-only">
                {t("contactForm.labelMessage", "Your message")}
              </label>
              <textarea
                id="assist-message"
                placeholder={t(
                  "contactForm.placeholderMessage",
                  "Example message…"
                )}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:border-transparent ${
                  errors.message
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-[#090C41]"
                }`}
              />
              {errors.message ? (
                <p className="text-xs text-red-500">{errors.message}</p>
              ) : null}

              {/* Email */}
              <label htmlFor="assist-email" className="sr-only">
                {t("contactForm.labelEmail", "Your email")}
              </label>
              <input
                id="assist-email"
                type="email"
                placeholder={t(
                  "contactForm.placeholderEmail",
                  "Contact@mail.com"
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-10 rounded-md border px-4 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:border-transparent ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:ring-[#090C41]"
                }`}
              />
              {errors.email ? (
                <p className="text-xs text-red-500">{errors.email}</p>
              ) : null}
            </form>

            {/* Summary + Send */}
            <div className="w-full mt-4 flex items-center justify-between gap-4">
              {summary ? (
                <div className="text-sm leading-snug text-gray-800 flex-1">
                  <p className="font-semibold">
                    {summary.heading ||
                      t(
                        "contactForm.summaryHeadingDefault",
                        "Based on your answers :"
                      )}
                  </p>
                  {summary.product != null && (
                    <p>
                      {t("contactForm.summaryProduct", "Product :")}{" "}
                      {summary.product}
                    </p>
                  )}
                  {summary.issue != null && (
                    <p>
                      {t("contactForm.summaryIssue", "Issue :")}{" "}
                      {summary.issue}
                    </p>
                  )}
                  {summary.detail != null && (
                    <p>
                      {t("contactForm.summaryDetail", "Detail :")}{" "}
                      {summary.detail}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex-1" />
              )}

              {/* Fixed width right-aligned block for the SelectableOption wrapper */}
              <div className="w-[140px] flex justify-end shrink-0">
                <SelectableOption
                  label={isSubmitting ? "..." : computedButtonLabel}
                  selected={sendSelected}
                  compact={true}
                  onClick={isSubmitting ? undefined : handleSend}
                  className={`${
                    isSubmitting ? "opacity-70 pointer-events-none" : ""
                  }`}
                />
              </div>
            </div>

            {/* Inline error (kept; will disappear on success) */}
            {submitError && (
              <p className="mt-2 text-xs text-red-600">{submitError}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}