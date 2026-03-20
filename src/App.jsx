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
import AssistanceWelcome from "./pages/assistance/Welcome";
import AssistanceAmputationSelection from "./pages/assistance/AmputationSelection";
import AssistanceProductSelection from "./pages/assistance/ProductSelection";

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
        <Route path="/assistance" element={<AssistanceWelcome />} />
        <Route path="/assistance/amputation" element={<AssistanceAmputationSelection />} />
        <Route path="/assistance/product" element={<AssistanceProductSelection />} />
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
