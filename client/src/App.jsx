import "./App.css";
import Auth from "./components/auth/Auth";
import AuthCompany from "./components/auth/AuthCompany";
import Profile from "./components/profile/Profile";
import LandingPage from "./components/LandingPage/LandingPage";
import JobPostings from "./components/jobPostings/JobPostings";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<Auth updateToken={updateToken} />} />
        <Route path="/companystart" element={<AuthCompany updateToken={updateToken} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobPostings" element={<JobPostings token={sessionToken} />} /> 
      </Routes>
    </div>
  );
}

export default App;
