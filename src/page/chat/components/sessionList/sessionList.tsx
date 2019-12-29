import React from "react";
import SessionItem, { SessionItemProps } from "../sessionItem";
import { classNames, scopedClassMaker } from "@/utils";

import "./sessionList.scss";

const sc = scopedClassMaker("session-list");

const SessionList: React.FC = () => {
  const friendList: Array<SessionItemProps> = [
    {
      jid: "asemoemo#chatdemoui_test1@easemob.com",
      name: "test1",
      subscription: "both"
    }
  ];
  return (
    <div className={classNames(sc())}>
      {friendList.length > 0 ? (
        <ul>
          {friendList.map((friendInfo) => (
            <li key={friendInfo.jid}>
              <SessionItem {...friendInfo} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SessionList;
