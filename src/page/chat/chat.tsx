import React from "react";
import { useShallowEqualSelector } from "@/hooks";
import { StoreType } from "@/store";
import { classNames, scopedClassMaker } from "@/utils";
import SlideBar from "./components/slideBar";
import SessionList from "./components/sessionList";
import ChatPanel from "./components/chatPanel";
import "./chat.scss";

const sc = scopedClassMaker("chat");

const Chat: React.FC = () => {
  const user = useShallowEqualSelector((store: StoreType) => store.user);
  return (
    <div className={classNames(sc("page"))}>
      <SlideBar />
      <SessionList />
      <ChatPanel active={false} />
    </div>
  );
};

export default Chat;
