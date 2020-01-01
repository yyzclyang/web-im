import React, { useEffect } from "react";
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

const Chat: React.FC = () => {
  const friendsList = useShallowEqualSelector(
    (store: StoreType) => store.friends
  ).filter((friendData) => friendData.subscription === "both");
  const dispatch = useDispatch();

  useEffect(() => {
    getFriendsListAction()(dispatch);
  }, []);

  return (
    <div className={classNames(sc("page"))}>
      <SlideBar />
      <SessionList friendList={friendsList} />
      <ChatPanel active={false} />
    </div>
  );
};

export default Chat;
