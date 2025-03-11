import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context.jsx/AuthContext.jsx";
import LoginPage from "./pages/login.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import { ResetPasswordPage } from "./pages/forgetPassord.jsx";

function AppWrapper() {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resetPassord" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<App />} />
        {/* </Route> */}
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
