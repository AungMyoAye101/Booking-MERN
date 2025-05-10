import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

import { SearchProvider } from "./context/SearchContext.tsx";
import { AuthProvider } from "./context/authContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </StrictMode>
);
