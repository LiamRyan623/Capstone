import "./App.css";
import Auth from "./components/auth/Auth";
import AuthCompany from "./components/auth/AuthCompany";
import Profile from "./components/profile/Profile";
import LandingPage from "./components/LandingPage/LandingPage";
import JobPostings from "./components/jobPostings/JobPostings";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileEdit from "./components/profile/ProfileEdit";

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
<<<<<<< HEAD
        <Route
          path="/companystart"
          element={<AuthCompany updateToken={updateToken} />}
        />
        <Route path="/profile" element={<Profile token = {sessionToken} />} />
        <Route path="/jobs" element={<JobPostings />}/>
        <Route path="/profileEdit" element={<ProfileEdit token = {sessionToken}/>} />
=======
        <Route path="/companystart" element={<AuthCompany updateToken={updateToken} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileEdit" element={<ProfileEdit token=
        {sessionToken}/>} />
>>>>>>> eab4b1b (jobPosting working)
        <Route path="/jobPostings" element={<JobPostings token={sessionToken} />} /> 
      </Routes>
    </div>
  );
}

export default App;
