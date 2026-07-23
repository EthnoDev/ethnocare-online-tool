import PageTransitionWrapper from "./PageTransitionWrapper";
import { useTranslation } from "react-i18next";

export default function Popup({ type, onClose }) {
  const { t } = useTranslation(["common", "errors"]);

  const tableData = {
    tt: {
      title: "Overlay TT",
      length: "Min: 13.5 cm / 5.3 Inch\nMax: -",
      circumference: "Min: 24 cm / 9.4 Inch\nMax: 42 cm / 16.5 Inch",
    },
    tf: {
      title: "Overlay TF",
      length: "Min: 20 cm / 7.9 Inch\nMax: -",
      circumference: "Min: 32 cm / 12.6 Inch\nMax: 62 cm / 24.4 Inch",
    },
  };

  const underlayTTTables = [
    {
      title: t("popup.underlay_open_title"),
      rows: [
        {
          label: t("popup.label_length"),
          value: "Min: 23 cm / 9 Inch\nMax: -",
        },
        {
          label: t("popup.label_circumferenceDistal"),
          value: "Min: 20 cm / 7.8 Inch\nMax: 42 cm / 16.5 Inch",
        },
        {
          label: t("popup.label_circumferenceUpper"),
          value: "Min: 20 cm / 7.8 Inch\nMax: 55 cm / 21.6 Inch",
        },
      ],
    },
    {
      title: t("popup.underlay_closed_title"),
      rows: [
        {
          label: t("popup.label_length"),
          value: "Min: 27 cm / 10.6 Inch\nMax: -",
        },
        {
          label: t("popup.label_circumferenceDistal"),
          value: "Min: 20 cm / 7.8 Inch\nMax: 42 cm / 16.5 Inch",
        },
      ],
    },
  ];

  const ttLinerTables = [
    {
      title: `Liner TT - ${t("popup.silicone")}`,
      rows: [
        {
          label: t("popup.labelDistal"),
          value: "Min : 16 cm / 6.2 Inch\nMax : 45 cm / 17.7 Inch",
        },
        {
          label: t("popup.labelProximal"),
          value: "Min : 20 cm / 7.8 Inch\nMax : 48.5 cm / 19 Inch",
        },
      ],
    },
    {
      title: "Liner TT - Gel",
      rows: [
        {
          label: t("popup.labelDistal"),
          value: "Min : 15 cm / 5.9 Inch\nMax : 53 cm / 20.8 Inch",
        },
        {
          label: t("popup.labelProximal"),
          value: "Min : 24 cm / 9.4 Inch\nMax : 70 cm / 27.5 Inch",
        },
      ],
    },
  ];

  const tfLinerTables = [
    {
      title: `Liner TF - ${t("popup.silicone")}`,
      rows: [
        {
          label: t("popup.labelDistal"),
          value: "Min : 25 cm / 9.8 Inch\nMax : 55 cm / 21.6 Inch",
        },
        {
          label: t("popup.labelProximal"),
          value: "Min : 28.5 cm / 11.2 Inch\nMax : 63 cm / 24.8 Inch",
        },
      ],
    },
    {
      title: "Liner TF - Gel",
      rows: [
        {
          label: t("popup.labelDistal"),
          value: "Min : 15 cm / 5.9 Inch\nMax : 53 cm / 20.8 Inch",
        },
        {
          label: t("popup.labelProximal"),
          value: "Min : 24 cm / 9.4 Inch\nMax : 70 cm / 27.5 Inch",
        },
      ],
    },
  ];

  const multiTables =
    type === "underlaytt"
      ? underlayTTTables
      : type === "ttLiner"
      ? ttLinerTables
      : type === "tfLiner"
      ? tfLinerTables
      : null;

  const { title, length, circumference } = tableData[type] || {};

  return (
    <PageTransitionWrapper>
      <div className="w-full flex justify-center px-4">
        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-sm text-center font-sans border border-gray-200 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">{t("popup.notice_title")}</h2>
          <p className="text-gray-600 text-sm mb-6">
            {t("popup.notice_description")}
          </p>

          {multiTables ? (
            <div className="flex flex-col gap-4 mb-4">
              {multiTables.map((table) => (
                <table key={table.title} className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr>
                      <th colSpan="2" className="bg-gray-100 border-b border-gray-300 p-2 font-semibold">
                        {table.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i}>
                        <td className="border border-gray-300 p-2 font-medium text-left whitespace-pre-line">
                          {row.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-left whitespace-pre-line">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          ) : (
            <table className="w-full mb-4 border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th colSpan="2" className="bg-gray-100 border-b border-gray-300 p-2 font-semibold">
                    {title}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium text-left">{t("popup.label_length")}</td>
                  <td className="border border-gray-300 p-2 text-left whitespace-pre-line">{length}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium text-left">{t("popup.label_circumference")}</td>
                  <td className="border border-gray-300 p-2 text-left whitespace-pre-line">{circumference}</td>
                </tr>
              </tbody>
            </table>
          )}

          <p className="text-gray-600 text-sm">
            {t("popup.contact_line")}
          </p>
          <p className="text-sm font-bold underline text-[#090C41] mb-6">clinics@ethnocare.ca</p>

          <button
            onClick={() => setTimeout(onClose, 100)}
            className="px-4 py-2 bg-[#090C41] text-white rounded-md hover:bg-[#1a1e6f] transition cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}