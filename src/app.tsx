import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "@/store";
import { login } from "@/store/action";
import "./app.scss";

const App: React.FunctionComponent = ({}) => {
  const sign = useSelector((state: StoreType) => state.sign.signState);
  const dispatch = useDispatch();

  const [count, setCount] = React.useState<number>(1);

  return (
    <div className="page">
      <span>登录状态：{sign}</span>
      <button
        onClick={() => {
          dispatch(login(count));
          setCount((count) => count + 1);
        }}
      >
        click
      </button>
    </div>
  );
};

export default App;
