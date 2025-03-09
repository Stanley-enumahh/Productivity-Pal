import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context.jsx/AuthContext.jsx";
import Login from "./pages/Login.jsx";

function AppWrapper() {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
