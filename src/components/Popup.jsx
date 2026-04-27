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
    underlaytt: {
      title: "Underlay TT",
      length: "Min: 23 cm / 9.1 Inch\nMax: -",
      circumference: "Min: 15 cm / 5.9 Inch\nMax: 42 cm / 16.5 Inch",
    },
  };

  const { title, length, circumference } = tableData[type] || {};

  return (
    <PageTransitionWrapper>
    <div className="w-full flex justify-center px-4">
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-sm text-center font-sans border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">{t("popup.notice_title")}</h2>
      <p className="text-gray-600 text-sm mb-6">
        {t("popup.notice_description")}
      </p>

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
            <td className="border border-gray-300 p-2 text-left whitespace-pre-line">
              {length}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-medium text-left">{t("popup.label_circumference")}</td>
            <td className="border border-gray-300 p-2 text-left whitespace-pre-line">
              {circumference}
            </td>
          </tr>
        </tbody>
      </table>

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
