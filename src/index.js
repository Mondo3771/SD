import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-1ycr2f4brea4mqn0.us.auth0.com"
    clientId="juNXYFvRfNFL4pk7FqMPEgJ1i2Z3zsJR"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
