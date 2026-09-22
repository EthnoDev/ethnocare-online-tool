import { useEffect } from "react";
import PageTransitionWrapper from "./PageTransitionWrapper";
import { useTranslation } from "react-i18next";
import XIcon from "../assets/x.svg";

export default function Popup({ type, measurement, onClose }) {
  const { t } = useTranslation(["common", "errors"]);
  
  // Units & suspension context
  const isImperial = localStorage.getItem("units") === "imperial";
  const suspension = localStorage.getItem("suspension");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const getTableConfigs = () => {
    // ----------------------------------------------------
    // TT OVERLAY
    // ----------------------------------------------------
    if (type === "tt") {
      if (measurement === "length") {
        return [
          {
            title: t("popup.ttLockCush"),
            rows: [
              {
                label: t("popup.label_length"),
                value: isImperial
                  ? "Min : 4.7 in\nMax : None"
                  : "Min : 12 cm\nMax : None",
              },
            ],
            footnote: t("popup.ttLLockCushNote"),
          },
          {
            title: t("popup.ttDistal"),
            rows: [
              {
                label: t("popup.label_length"),
                value: isImperial
                  ? "Min : 3.1 in\nMax : None"
                  : "Min : 8 cm\nMax : None",
              },
            ],
            footnote: t("popup.ttLDistalNote"),
          },
        ];
      }

      // Circumference
      return [
        {
          title: t("popup.ttLockCush"),
          rows: [
            {
              label: t("popup.label_circumference"),
              value: isImperial
                ? "Min : 9.4 in\nMax : 16.5 in"
                : "Min : 24 cm\nMax : 42 cm",
            },
          ],
          footnote: t("popup.ttCLockCushNote", {
            distance: isImperial ? "1.5 in" : "4 cm",
          }),
        },
        {
          title: t("popup.ttDistal"),
          rows: [
            {
              label: t("popup.label_circumference"),
              value: isImperial
                ? "Min : 9.4 in\nMax : 16.5 in"
                : "Min : 24 cm\nMax : 42 cm",
            },
          ],
          footnote: t("popup.ttCDistalNote"),
        },
      ];
    }

    // ----------------------------------------------------
    // TF OVERLAY
    // ----------------------------------------------------
    if (type === "tf") {
      const isPin = suspension === "TF-pin";

      if (measurement === "length") {
        return [
          {
            title: isPin ? t("popup.tfPin") : t("popup.tfVac"),
            rows: [
              {
                label: t("popup.label_length"),
                value: isImperial
                  ? "Min : 7.8 in\nMax : None"
                  : "Min : 20 cm\nMax : None",
              },
            ],
            footnote: isPin
              ? t("popup.tfLPinNote")
              : t("popup.tfLVacNote"),
          },
        ];
      }

      // Circumference
      return [
        {
          title: isPin ? t("popup.tfPin") : t("popup.tfVac"),
          rows: [
            {
              label: t("popup.label_circumference"),
              value: isImperial
                ? "Min : 12.6 in\nMax : 24.4 in"
                : "Min : 32 cm\nMax : 62 cm",
            },
          ],
          footnote: isPin
            ? t("popup.tfCPinNote", {
                distance: isImperial ? "3.1 in" : "8 cm",
              })
            : t("popup.tfCVacNote"),
        },
      ];
    }

    // ----------------------------------------------------
    // TT UNDERLAY
    // ----------------------------------------------------
    if (type === "underlaytt") {
      if (measurement === "length") {
        return [
          {
            title: t("popup.uttOpen"),
            rows: [
              {
                label: t("popup.label_length"),
                value: isImperial
                  ? "Min : 9 in\nMax : None"
                  : "Min : 23 cm\nMax : None",
              },
            ],
            footnote: t("popup.uttLOpenNote"),
          },
          {
            title: t("popup.uttClosed"),
            rows: [
              {
                label: t("popup.label_length"),
                value: isImperial
                  ? "Min : 10.6 in\nMax : None"
                  : "Min : 27 cm\nMax : None",
              },
            ],
            footnote: t("popup.uttLClosedNote"),
          },
        ];
      }

      // Circumference
      return [
        {
          title: t("popup.uttOpen"),
          rows: [
            {
              label: t("popup.label_circumference"),
              value: isImperial
                ? "Min : 9 in\nMax : 16.5 in"
                : "Min : 23 cm\nMax : 42 cm",
            },
          ],
          footnote: t("popup.uttCOpenNote", {
            distance: isImperial ? "3.9 in" : "10 cm",
          }),
        },
        {
          title: t("popup.uttClosed"),
          rows: [
            {
              label: t("popup.label_circumference"),
              value: isImperial
                ? "Min : 9 in\nMax : 16.5 in"
                : "Min : 23 cm\nMax : 42 cm",
            },
          ],
          footnote: t("popup.uttCClosedNote", {
            distance: isImperial ? "1.5 in" : "4 cm",
          }),
        },
      ];
    }

    // ----------------------------------------------------
    // TT LINER
    // ----------------------------------------------------
    if (type === "ttLiner") {
      return [
        {
          title: `Liner TT - ${t("popup.silicone", "Silicone")}`,
          rows: [
            {
              label: t("popup.labelDistal", "Distal"),
              value: isImperial
                ? "Min : 6.2 in\nMax : 17.7 in"
                : "Min : 16 cm\nMax : 45 cm",
            },
            {
              label: t("popup.labelProximal", "Proximal"),
              value: isImperial
                ? "Min : 7.8 in\nMax : 19 in"
                : "Min : 20 cm\nMax : 48.5 cm",
            },
          ],
        },
        {
          title: "Liner TT - Gel",
          rows: [
            {
              label: t("popup.labelDistal", "Distal"),
              value: isImperial
                ? "Min : 5.9 in\nMax : 20.8 in"
                : "Min : 15 cm\nMax : 53 cm",
            },
            {
              label: t("popup.labelProximal", "Proximal"),
              value: isImperial
                ? "Min : 9.4 in\nMax : 27.5 in"
                : "Min : 24 cm\nMax : 70 cm",
            },
          ],
        },
      ];
    }

    // ----------------------------------------------------
    // TF LINER
    // ----------------------------------------------------
    if (type === "tfLiner") {
      return [
        {
          title: `Liner TF - ${t("popup.silicone", "Silicone")}`,
          rows: [
            {
              label: t("popup.labelDistal", "Distal"),
              value: isImperial
                ? "Min : 9.8 in\nMax : 21.6 in"
                : "Min : 25 cm\nMax : 55 cm",
            },
            {
              label: t("popup.labelProximal", "Proximal"),
              value: isImperial
                ? "Min : 11.2 in\nMax : 24.8 in"
                : "Min : 28.5 cm\nMax : 63 cm",
            },
          ],
        },
        {
          title: "Liner TF - Gel",
          rows: [
            {
              label: t("popup.labelDistal", "Distal"),
              value: isImperial
                ? "Min : 5.9 in\nMax : 20.8 in"
                : "Min : 15 cm\nMax : 53 cm",
            },
            {
              label: t("popup.labelProximal", "Proximal"),
              value: isImperial
                ? "Min : 9.4 in\nMax : 27.5 in"
                : "Min : 24 cm\nMax : 70 cm",
            },
          ],
        },
      ];
    }

    return [];
  };

  const tables = getTableConfigs();

  return (
    <PageTransitionWrapper>
      <div className="w-full flex justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-sm text-center font-sans border border-gray-100 max-h-[90vh] overflow-y-auto">
          {/* Close Button (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <img src={XIcon} alt="" className="w-5 h-5 pointer-events-none" />
          </button>

          {/* Main Title */}
          <h2 className="text-2xl font-bold mt-3 text-slate-900 leading-tight">
            {t("popup.notice_title")}
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            {t("popup.notice_description")}
          </p>

          {/* Dynamic Table Section */}
          <div className="flex flex-col gap-4 mt-3">
            {tables.map((table, idx) => (
              <div key={idx} className="w-full">
                <table className="w-full border border-gray-300 text-sm border-collapse">
                  <thead>
                    <tr>
                      <th
                        colSpan="2"
                        className="bg-gray-100 border-b border-gray-300 p-2 font-semibold text-gray-800 text-center"
                      >
                        {table.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i}>
                        <td className="border border-gray-300 p-2 font-medium text-left w-1/3 align-middle text-gray-800">
                          {row.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-left whitespace-pre-line align-middle text-gray-700">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footnote under the table */}
                {table.footnote && (
                  <p className="text-xs text-slate-500 text-left mt-1 leading-tight">
                    {table.footnote}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Line */}
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              {t("popup.contact_line")}
            </p>
            <p className="text-sm font-bold underline text-black">
              Clinics@ethnocare.ca
            </p>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}