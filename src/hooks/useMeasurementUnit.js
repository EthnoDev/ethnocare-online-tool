import { useEffect, useState } from "react";

const UNIT_CHANGE_EVENT = "measurement-unit-change";

const getMeasurementUnit = () =>
  localStorage.getItem("units") === "imperial" ? "in" : "cm";

export const setMeasurementUnit = (unit) => {
  localStorage.setItem("units", unit === "in" ? "imperial" : "metric");
  window.dispatchEvent(new Event(UNIT_CHANGE_EVENT));
};

export default function useMeasurementUnit() {
  const [unit, setUnit] = useState(getMeasurementUnit);

  useEffect(() => {
    const handleUnitChange = () => setUnit(getMeasurementUnit());
    window.addEventListener(UNIT_CHANGE_EVENT, handleUnitChange);
    return () => window.removeEventListener(UNIT_CHANGE_EVENT, handleUnitChange);
  }, []);

  return unit;
}
