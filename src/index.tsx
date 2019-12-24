import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@/store";
import App from "./app";
import "antd/dist/antd.css";
import Loading from "@/components/loading";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Loading />
  </Provider>,
  document.getElementById("root")
);
