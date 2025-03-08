import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { AuthProvider } from "./context/authContext.tsx";
import { SearchContextProvider } from "./context/SearchContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthProvider>
  </StrictMode>
);
