import React from "react";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";
import { FriendData } from "@/config/WebIM";

const sc = scopedClassMaker("session-item");

type SessionItemProps = FriendData;

const SessionItem: React.FC<SessionItemProps> = (props: SessionItemProps) => {
  const { name } = props;
  return (
    <div className={classNames(sc())}>
      <span className={classNames(sc("name"))}>{name}</span>
    </div>
  );
};

export default SessionItem;
export { SessionItemProps };
