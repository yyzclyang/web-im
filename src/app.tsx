import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, useLocation, useHistory } from "react-router-dom";
import { classNames, scopedClassMaker, tokenUtil } from "@/utils";
import { SignIn, SignUp } from "./page/sign";
import Chat from "./page/chat";
import "./app.scss";

const sc = scopedClassMaker("web-im");

const App: React.FunctionComponent = ({}) => {
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    const isChatPage = /^\/chat\/?S*/.test(location.pathname);
    if (isChatPage && !tokenUtil.getToken()) {
      history.push("/signIn");
    }
  }, [location, tokenUtil]);
  return (
    <div className={classNames(sc("container"))}>
      <Route exact path="/" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/signIn" component={SignIn} />
      <Route exact path="/chat/:chatType?/:chatId?" component={Chat} />
    </div>
  );
};

export default hot(App);
