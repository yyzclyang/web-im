import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import SessionItem from "../sessionItem";
import { FriendInfo } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import { ChatType } from "../../chat";
import { MessageListType } from "@/store/reducer/message";
import { setNewMessageCount } from "@/store/action";
import "./sessionList.scss";

const sc = scopedClassMaker("session-list");

interface SessionListProps {
  chatType: ChatType;
  chatId?: string;
  friendList: Array<FriendInfo>;
  messageList: MessageListType;
}

const SessionList: React.FC<SessionListProps> = (props: SessionListProps) => {
  const { chatType, friendList, messageList } = props;

  const dispatch = useDispatch();

  return (
    <div className={classNames(sc())}>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friendInfo) => {
            const messages = messageList[friendInfo.name];
            const messagesData = messages?.messageData;
            const newMessageCount = messages?.newMessageCount ?? 0;
            const message = messagesData
              ? messagesData[messagesData.length - 1].data
              : "";
            return (
              <li key={friendInfo.name}>
                <NavLink
                  to={`/chat/${chatType}/${friendInfo.name}`}
                  replace
                  className={classNames(sc("link"))}
                  onClick={() => {
                    dispatch(setNewMessageCount(friendInfo.name, 0));
                  }}
                >
                  <SessionItem
                    friendInfo={friendInfo}
                    newMessageCount={newMessageCount}
                    message={message}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default SessionList;
