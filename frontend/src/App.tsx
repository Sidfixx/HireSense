import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CandidateMatching from "./pages/recruiter/CandidateMatching";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/recruiter/matching"
        element={<CandidateMatching />}
      />
    </Routes>
  );
}

export default App;