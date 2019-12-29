import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store";
import App from "./app";
import Loading from "@/components/loading";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Loading />
    </Router>
  </Provider>,
  document.getElementById("root")
);
