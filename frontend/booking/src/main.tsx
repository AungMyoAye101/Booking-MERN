import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { AuthProvider } from "./context/authContext.tsx";
import ToastProvider from "./context/ToastProvider.tsx";




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider />
      <App />
    </AuthProvider>
  </StrictMode>
);
