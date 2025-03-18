import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignUp from "../src/pages/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context.jsx/AuthContext.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { ResetPassword } from "./pages/resetPassword.jsx";
import { ProtectedRoute } from "./components/protectedRoute.jsx";

function AppWrapper() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/app" element={<App />} />
        {/* </Route> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
