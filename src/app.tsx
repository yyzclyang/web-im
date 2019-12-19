import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import "./app.scss";

const App: React.FunctionComponent = ({}) => {
  const sign = useSelector((state: StoreType) => state.sign.signState);
  return <div className="page">登录状态：{sign}</div>;
};

export default App;
