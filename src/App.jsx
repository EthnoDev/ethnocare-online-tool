import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

// Pages
import MainWelcome from "./pages/Welcome";
import RecommendationWelcome from "./pages/recommendation/Welcome"; 
import ReturnWelcome from "./pages/return/Welcome";
import ReturnIdentification from "./pages/return/Identification";
import ReturnAssistanceTool from "./pages/return/AssistanceTool"; 
import SizingWelcome from "./pages/sizing/Welcome";
import SizingUnitsSelection from "./pages/sizing/UnitsSelection";
import SizingAmputationSelection from "./pages/sizing/AmputationSelection";
import SizingProductSelection from "./pages/sizing/ProductSelection";
import SizingTTSuspensionSelection from "./pages/sizing/overlay/TT/SuspensionSelection";
import SizingTTCircumference from "./pages/sizing/overlay/TT/Circumference";
import SizingTTCircumferenceVac from "./pages/sizing/overlay/TT/CircumferenceVac";
import SizingTTLength from "./pages/sizing/overlay/TT/Length";
import SizingTTLengthVac from "./pages/sizing/overlay/TT/LengthVac";
import OrientationSelection from "./pages/sizing/overlay/TT/OrientationSelection";
import SizeTT from "./pages/sizing/overlay/TT/Size";
import SizingTFSuspensionSelection from "./pages/sizing/overlay/TF/SuspensionSelection";
import SizingTFLength from "./pages/sizing/overlay/TF/Length";
import SizingTFLengthVac from "./pages/sizing/overlay/TF/LengthVac";
import SizingTFCircumference from "./pages/sizing/overlay/TF/Circumference";
import SizingTFCircumferenceVac from "./pages/sizing/overlay/TF/CircumferenceVac";
import AssistanceWelcome from "./pages/assistance/Welcome";
import AssistanceAmputationSelection from "./pages/assistance/AmputationSelection";
import AssistanceProductSelection from "./pages/assistance/ProductSelection";
import AssistanceSelection from "./pages/assistance/AssistanceSelection";
import AssistanceSizeSelection from "./pages/assistance/SizeSelection";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainWelcome />} />
        <Route path="/return" element={<ReturnWelcome />} />
        <Route path="/return/identification" element={<ReturnIdentification />} />
        <Route path="/return/assistance-tool" element={<ReturnAssistanceTool />} />
        <Route path="/recommendation" element={<RecommendationWelcome />} />
        <Route path="/sizing" element={<SizingWelcome />} />
        <Route path="/sizing/units" element={<SizingUnitsSelection />} />
        <Route path="/sizing/amputation" element={<SizingAmputationSelection />} />
        <Route path="/sizing/product" element={<SizingProductSelection />} />
        <Route path="/sizing/TTsuspension" element={<SizingTTSuspensionSelection />} />
        <Route path="/sizing/TTcircumference" element={<SizingTTCircumference />} />
        <Route path="/sizing/TTcircumference-vac" element={<SizingTTCircumferenceVac />} />
        <Route path="/sizing/TTlength" element={<SizingTTLength />} />
        <Route path="/sizing/TTlength-vac" element={<SizingTTLengthVac />} />
        <Route path="/sizing/TTorientation" element={<OrientationSelection />} />
        <Route path="/sizing/TTsize" element={<SizeTT />} />
        <Route path="/sizing/TFsuspension" element={<SizingTFSuspensionSelection />} />
        <Route path="/sizing/TFlength" element={<SizingTFLength />} />
        <Route path="/sizing/TFlength-vac" element={<SizingTFLengthVac />} />
        <Route path="/sizing/TFcircumference" element={<SizingTFCircumference />} />
        <Route path="/sizing/TFcircumference-vac" element={<SizingTFCircumferenceVac />} />
        <Route path="/assistance" element={<AssistanceWelcome />} />
        <Route path="/assistance/amputation" element={<AssistanceAmputationSelection />} />
        <Route path="/assistance/product" element={<AssistanceProductSelection />} />
        <Route path="/assistance/selection" element={<AssistanceSelection />} />
        <Route path="/assistance/size" element={<AssistanceSizeSelection />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Analytics />
    </Router>
  );
}
