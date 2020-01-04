import React from "react";
import { NavLink } from "react-router-dom";
import SessionItem from "../sessionItem";
import { FriendData } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionList.scss";
import { ChatType } from "../../chat";

const sc = scopedClassMaker("session-list");

interface SessionListProps {
  chatType: ChatType;
  chatId?: string;
  friendList: Array<FriendData>;
}

const SessionList: React.FC<SessionListProps> = (props: SessionListProps) => {
  const { chatType, friendList } = props;

  return (
    <div className={classNames(sc())}>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friendInfo) => (
            <li key={friendInfo.name}>
              <NavLink
                to={`/chat/${chatType}/${friendInfo.name}`}
                replace
                className={classNames(sc("link"))}
              >
                <SessionItem friendInfo={friendInfo} />
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SessionList;
