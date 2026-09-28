import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";
import leakTestVideo from "../../../assets/videos/leak-test.mp4";

export default function AirLoss() {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("airLossAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("airLossAssistance.description")}
        </p>

        <video
          src={leakTestVideo}
          controls
          playsInline
          className="w-full h-auto mt-8 rounded-xl"
        />

        <p className="mt-3 text-center text-xl font-semibold">
          {t("airLossAssistance.demand")}
        </p>

        <div className="mt-2 space-y-6 flex flex-col items-center">
          <SelectableOption
            label={
              <Trans
                ns="pages"
                i18nKey="airLossAssistance.valve"
                components={{
                  bold: <strong className="font-bold text-black" />
                }}
              />
            }
            selected={selected === "valve"}
            onClick={() => setSelected("valve")}
          />

          <SelectableOption
            label={
              <Trans
                ns="pages"
                i18nKey="airLossAssistance.pump"
                components={{
                  bold: <strong className="font-bold text-black" />
                }}
              />
            }
            selected={selected === "pump"}
            onClick={() => setSelected("pump")}
          />

          <SelectableOption
            label={
              <Trans
                ns="pages"
                i18nKey="airLossAssistance.none"
                components={{
                  bold: <strong className="font-bold text-black" />
                }}
              />
            }
            selected={selected === "none"}
            onClick={() => setSelected("none")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
