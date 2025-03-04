import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import AuthContextProvider from "./context/authContext.tsx";
import { SearchContextProvider } from "./context/SearchContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
