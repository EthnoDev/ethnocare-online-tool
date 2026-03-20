import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

// assets
import TT from "../../assets/amputation/transtibial.png";
import TF from "../../assets/amputation/transfemoral.png";
import TF_FR from "../../assets/amputation/transfemoral_FR.png";

export default function AssistanceAmputationSelection() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(null);

  const tfImage = i18n.language === "fr" ? TF_FR : TF;

  const handleSelect = (type) => {
    if (selected) return;

    setSelected(type);
    localStorage.setItem("amputation", type);

    setTimeout(() => {
      navigate("/assistance/product");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/assistance" code={true}>
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          Amputation
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          What is your amputation type.
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleSelect("transtibial")}
            className="cursor-pointer focus:outline-none"
            aria-label="Transtibial"
            title="Transtibial"
          >
            <div
              className={`rounded-xl ${
                selected === "transtibial"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
              }`}
            >
              <img
                src={TT}
                alt="Transtibial"
                className="w-60 h-auto object-contain rounded-xl block"
              />
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelect("transfemoral")}
            className="cursor-pointer focus:outline-none"
            aria-label="Transfemoral"
            title="Transfemoral"
          >
            <div
              className={`rounded-xl ${
                selected === "transfemoral"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
              }`}
            >
              <img
                src={tfImage}
                alt="Transfemoral"
                className="w-60 h-auto object-contain rounded-xl block"
              />
            </div>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}