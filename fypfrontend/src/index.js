import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import AlertContextProvider from "./store/alert-context";
import PatientTokenContextProvider from "./store/patientToken-context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
// window.onbeforeunload = () =>
//   "If you leave this page, you'll also leave the call";

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();