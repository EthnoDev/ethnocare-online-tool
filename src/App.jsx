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
import SizeTF from "./pages/sizing/overlay/TF/Size";
import SizingUnderlaySealSelection from "./pages/sizing/underlay/SealSelection";
import SizingUnderlayLength from "./pages/sizing/underlay/Length";
import SizingUnderlayCircumference from "./pages/sizing/underlay/Circumference";
import SizingUnderlayCircumference2 from "./pages/sizing/underlay/Circumference2";
import SizingUnderlaySiliconeSelection from "./pages/sizing/underlay/SiliconeSelection";
import SizeUnderlay from "./pages/sizing/underlay/Size";
import SizingLinerActivityLevelSelection from "./pages/sizing/liner/ActivityLevelSelection";
import SizingLinerMaterialSelection from "./pages/sizing/liner/MaterialSelection";
import SizingLinerTTCircumference from "./pages/sizing/liner/TT/Circumference";
import SizingLinerTFCircumference from "./pages/sizing/liner/TF/Circumference";
import SizingLinerLength from "./pages/sizing/liner/Length";
import SizingLinerSuspensionSelection from "./pages/sizing/liner/SuspensionSelection";
import AssistanceWelcome from "./pages/assistance/Welcome";
import AssistanceAmputationSelection from "./pages/assistance/AmputationSelection";
import AssistanceProductSelection from "./pages/assistance/ProductSelection";
import AssistanceSelection from "./pages/assistance/AssistanceSelection";
import AssistanceSizeSelection from "./pages/assistance/SizeSelection";
import AssistanceProblemSelection from "./pages/assistance/ProblemSelection";
import AssistancePressurePoints from "./pages/assistance/problems/PressurePoints";
import AssistanceBadFit from "./pages/assistance/problems/BadFit";
import AssistanceMoving from "./pages/assistance/problems/Moving";
import AssistanceStirrup from "./pages/assistance/problems/Stirrup";
import AssistanceOther from "./pages/assistance/problems/Other";

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
        <Route path="/sizing/TFsize" element={<SizeTF />} />
        <Route path="/assistance" element={<AssistanceWelcome />} />
        <Route path="/assistance/amputation" element={<AssistanceAmputationSelection />} />
        <Route path="/assistance/product" element={<AssistanceProductSelection />} />
        <Route path="/assistance/selection" element={<AssistanceSelection />} />
        <Route path="/assistance/size" element={<AssistanceSizeSelection />} />
        <Route path="/assistance/problem" element={<AssistanceProblemSelection />} />
        <Route path="/assistance/problem/pressure-points" element={<AssistancePressurePoints />} />
        <Route path="/assistance/problem/bad-fit" element={<AssistanceBadFit />} />
        <Route path="/assistance/problem/moving" element={<AssistanceMoving />} />
        <Route path="/assistance/problem/stirrup" element={<AssistanceStirrup />} />
        <Route path="/assistance/problem/other" element={<AssistanceOther />} />
        <Route path="/sizing/underlay/seal" element={<SizingUnderlaySealSelection />} />
        <Route path="/sizing/underlay/length" element={<SizingUnderlayLength />} />
        <Route path="/sizing/underlay/circumference" element={<SizingUnderlayCircumference />} />
        <Route path="/sizing/underlay/circumference-2" element={<SizingUnderlayCircumference2 />} />
        <Route path="/sizing/underlay/silicone" element={<SizingUnderlaySiliconeSelection />} />
        <Route path="/sizing/underlay/size" element={<SizeUnderlay />} />
        <Route path="/sizing/liner/activity-level" element={<SizingLinerActivityLevelSelection />} />
        <Route path="/sizing/liner/material" element={<SizingLinerMaterialSelection />} />
        <Route path="/sizing/liner/tt/circumference" element={<SizingLinerTTCircumference />} />
        <Route path="/sizing/liner/tf/circumference" element={<SizingLinerTFCircumference />} />
        <Route path="/sizing/liner/length" element={<SizingLinerLength />} />
        <Route path="/sizing/liner/suspension" element={<SizingLinerSuspensionSelection />} />
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
