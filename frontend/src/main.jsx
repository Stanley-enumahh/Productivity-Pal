import React from "react";
import ReactDOM from "react-dom/client";
import SignUp from "./pages/SignUp/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context.jsx/AuthContext.jsx";
import LoginPage from "./pages/Login/loginPage.jsx";
import { ResetPassword } from "./pages/resetPassword.jsx";
import ProtectedRoute from "./pages/protectedRoute.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import NoteUi from "./features/Notes/NoteUi.jsx";
import Dashboard from "./features/dashboard/dashboard.jsx";
import TasksUi from "./features/Tasks/TasksUi.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodosUi from "./features/Todos/TodosUi.jsx";
import Settings from "./features/Settings/Settings.jsx";
import { Navigate } from "react-router-dom";
import { NoteProvider } from "./context.jsx/noteContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <NoteProvider>
                  <App />
                </NoteProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" index element={<Dashboard />} />

            <Route path="notes" element={<NoteUi />} />
            <Route path="tasks" element={<TasksUi />} />
            <Route path="todos" element={<TodosUi />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
