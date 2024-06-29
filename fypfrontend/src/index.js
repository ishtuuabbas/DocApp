import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import AlertContextProvider from "./store/alert-context";
import PatientTokenContextProvider from "./store/patientToken-context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <PatientTokenContextProvider>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </PatientTokenContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.register();

reportWebVitals();
