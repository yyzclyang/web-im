import React from "react";
import { NavLink } from "react-router-dom";
import SessionItem from "../sessionItem";
import { FriendInfo } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionList.scss";
import { ChatType } from "../../chat";
import { MessageListType } from "@/store/reducer/message";

const sc = scopedClassMaker("session-list");

interface SessionListProps {
  chatType: ChatType;
  chatId?: string;
  friendList: Array<FriendInfo>;
  messageList: MessageListType;
}

const SessionList: React.FC<SessionListProps> = (props: SessionListProps) => {
  const { chatType, friendList, messageList } = props;

  return (
    <div className={classNames(sc())}>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friendInfo) => {
            const messages = messageList[friendInfo.name];
            const message = messages ? messages[messages.length - 1].data : "";
            return (
              <li key={friendInfo.name}>
                <NavLink
                  to={`/chat/${chatType}/${friendInfo.name}`}
                  replace
                  className={classNames(sc("link"))}
                >
                  <SessionItem friendInfo={friendInfo} message={message} />
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
