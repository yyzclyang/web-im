import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useShallowEqualSelector } from "@/hooks";
import { StoreType } from "@/store";
import WebIM, { FriendData } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import SlideBar from "./components/slideBar";
import SessionList from "./components/sessionList";
import ChatPanel from "./components/chatPanel";
import "./chat.scss";

const sc = scopedClassMaker("chat");

const Chat: React.FC = () => {
  const user = useShallowEqualSelector((store: StoreType) => store.user);

  const [friends, setFriends] = useState<Array<FriendData>>([]);
  useEffect(() => {
    WebIM.getFriend()
      .then((result) => {
        setFriends(() =>
          result.filter((friendData) => friendData.subscription === "both")
        );
      })
      .catch(() => {
        message.error("获取好友列表失败");
      });
  }, []);

  return (
    <div className={classNames(sc("page"))}>
      <SlideBar />
      <SessionList friendList={friends} />
      <ChatPanel active={false} />
    </div>
  );
};

export default Chat;
