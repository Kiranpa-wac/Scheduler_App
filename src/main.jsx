import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

 createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="833009699770-ghn9ccmrhk8qdk3s7mt61t4pfspnd83i.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
