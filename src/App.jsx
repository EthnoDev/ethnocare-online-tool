import { useState } from "react";
import SelectableOption from "./components/SelectableOption";

export default function App() {
  const [selected, setSelected] = useState("Metric");

  const options = ["Metric", "Imperial", "Custom"];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Ethnocare Tool
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Select an option
        </p>

        <div className="mt-8 space-y-3">
          {options.map((opt) => (
            <SelectableOption
              key={opt}
              label={opt}
              selected={selected === opt}
              onClick={() => setSelected(opt)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <SelectableOption
            label="Back"
            compact
            selected={false}
            onClick={() => alert("Back")}
          />
          <SelectableOption
            label="Continue"
            compact
            selected
            onClick={() => alert(`Selected: ${selected}`)}
          />
        </div>
      </div>
    </div>
  );
}
