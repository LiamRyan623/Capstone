import "./App.css";
import Auth from "./components/auth/Auth";
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
      <Auth updateToken={updateToken} />
    </div>
  );
}

export default App;
