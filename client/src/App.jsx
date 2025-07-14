import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DashboardPage from "./components/pages/DashboardPage";
import OnboardingPage from "./components/pages/OnboardingPage";
import QuestsPage from "./components/pages/QuestsPage";
import PetPage from "./components/pages/PetPage";
import LeaderboardPage from "./components/pages/LeaderboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/pet" element={<PetPage />} />
        <Route path="/onboard" element={<OnboardingPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;