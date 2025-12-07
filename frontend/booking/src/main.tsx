import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from "./App.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import ToastProvider from "./context/ToastProvider.tsx";

const queryClient = new QueryClient()



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <ToastProvider />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
