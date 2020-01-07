import React from "react";
import { Avatar } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";
import { FriendInfo } from "@/config/WebIM";

const sc = scopedClassMaker("session-item");

interface SessionItemProps {
  friendInfo: FriendInfo;
  message?: string;
}

const SessionItem: React.FC<SessionItemProps> = (props: SessionItemProps) => {
  const {
    friendInfo: { name },
    message
  } = props;
  return (
    <div className={classNames(sc())}>
      <Avatar className={classNames(sc("avatar"))} icon="user" shape="square" />
      <div className={classNames(sc("info"))}>
        <span className={classNames(sc("name"))}>{name}</span>
        <span className={classNames(sc("message"))}>{message}</span>
      </div>
    </div>
  );
};

export default SessionItem;
export { SessionItemProps };
