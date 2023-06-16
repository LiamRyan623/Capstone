import "./App.css";
// import Auth from "./components/auth/Auth";
import AuthCompany from "./components/auth/AuthCompany";
import Profile from "./components/profile/Profile";
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
        {/* <Route path="/" element={<Auth updateToken={updateToken} />} /> */}
        <Route path="/userLogin" element />
        <Route path="/" element={<AuthCompany updateToken={updateToken} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
