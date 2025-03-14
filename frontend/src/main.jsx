import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context.jsx/AuthContext.jsx";
import LoginPage from "./pages/Login.jsx";
import { ResetPassword } from "./pages/resetPassword.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

function AppWrapper() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<App />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
