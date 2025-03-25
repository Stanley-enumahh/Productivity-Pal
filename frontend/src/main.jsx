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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<App />}>
              <Route path="/app/dashboard" index element={<Dashboard />} />
              <Route path="/app/notes" element={<NoteUi />} />
              <Route path="/app/tasks" element={<TasksUi />} />
              <Route path="/app/todos" element={<TodosUi />} />
              <Route path="/app/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
