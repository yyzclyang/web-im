import React, { useEffect } from "react";
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

export type ChatType = "singlechat" | "groupchat";

const Chat: React.FC = () => {
  const { chatType = "singlechat", chatId } = useParams();
  const dispatch = useDispatch();

  const friendsList = useShallowEqualSelector(
    (store: StoreType) => store.friends
  ).filter((friendData) => friendData.subscription === "both");
  const messageList = useShallowEqualSelector(
    (store: StoreType) => store.messages
  );

  useEffect(() => {
    getFriendsListAction()(dispatch);
  }, []);

  return (
    <div className={classNames(sc("page"))}>
      <SlideBar />
      <SessionList
        chatType={chatType as ChatType}
        chatId={chatId}
        friendList={friendsList}
      />
      <ChatPanel
        chatType={chatType as ChatType}
        chatId={chatId}
        messageList={messageList[chatId!] ?? []}
        friendInfo={friendsList.find(
          (friendInfo) => friendInfo.name === chatId
        )}
      />
    </div>
  );
};

export default Chat;
