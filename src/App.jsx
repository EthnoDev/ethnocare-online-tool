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
import ReturnWelcome from "./pages/return/Welcome";
import ReturnIdentification from "./pages/return/Identification"; 
import RecommendationWelcome from "./pages/recommendation/Welcome";
import SizingWelcome from "./pages/sizing/Welcome";
import AssistanceWelcome from "./pages/assistance/Welcome";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainWelcome />} />
        <Route path="/return" element={<ReturnWelcome />} />
        <Route path="/recommendation" element={<RecommendationWelcome />} />
        <Route path="/sizing" element={<SizingWelcome />} />
        <Route path="/assistance" element={<AssistanceWelcome />} />
        <Route path="/return/identification" element={<ReturnIdentification />} />
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
