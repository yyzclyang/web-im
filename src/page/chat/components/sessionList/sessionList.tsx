import React from "react";
import SessionItem from "../sessionItem";
import { FriendData } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionList.scss";

const sc = scopedClassMaker("session-list");

interface SessionListProps {
  friendList: Array<FriendData>;
}

const SessionList: React.FC<SessionListProps> = (props: SessionListProps) => {
  const { friendList } = props;

  return (
    <div className={classNames(sc())}>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friendInfo) => (
            <li key={friendInfo.name}>
              <SessionItem {...friendInfo} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SessionList;
