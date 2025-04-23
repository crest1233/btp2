import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import LandingPage from "./components/LandingPage";
import InfluencerSignup from "./components/InfluencerSignup";
import FindInfluencersByEmail from "./components/FindInfluencersByEmail";
import SuccessPage from "./components/SuccessPage"; // ✅ new success page
import PredictPriceForm from "./components/PredictPriceForm";


// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<InfluencerSignup />} />
      <Route path="/find-by-email" element={<FindInfluencersByEmail />} />
      <Route path="/success" element={<SuccessPage />} /> {/* ✅ new route */}
      <Route path="/contact" element={<InfluencerSignup />} />
      <Route path="/predict-price" element={<PredictPriceForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
