import React from "react";
import "./styles.scss";
import ReactDOM from "react-dom/client";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
