import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShallowEqualSelector } from "@/hooks";
import { StoreType } from "@/store";
import { classNames, scopedClassMaker } from "@/utils";
import SlideBar from "./components/slideBar";
import SessionList from "./components/sessionList";
import ChatPanel from "./components/chatPanel";
import "./chat.scss";
import { useDispatch } from "react-redux";
import { getFriendsListAction } from "@/store/action";

const sc = scopedClassMaker("chat");

export type ChatType = "single" | "group";

const Chat: React.FC = () => {
  const { chatType = "single" } = useParams();

  const friendsList = useShallowEqualSelector(
    (store: StoreType) => store.friends
  ).filter((friendData) => friendData.subscription === "both");
  const dispatch = useDispatch();

  useEffect(() => {
    getFriendsListAction()(dispatch);
  }, []);

  return (
    <div className={classNames(sc("page"))}>
      <SlideBar chatType={chatType as ChatType} />
      <SessionList chatType={chatType as ChatType} friendList={friendsList} />
      <ChatPanel active={false} />
    </div>
  );
};

export default Chat;
