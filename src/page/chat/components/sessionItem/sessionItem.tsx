import React from "react";
import { Avatar, Badge } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";
import { FriendInfo } from "@/config/WebIM";

const sc = scopedClassMaker("session-item");

interface SessionItemProps {
  friendInfo: FriendInfo;
  newMessageCount: number;
  message?: string;
}

const SessionItem: React.FC<SessionItemProps> = (props: SessionItemProps) => {
  const {
    friendInfo: { name },
    newMessageCount,
    message
  } = props;
  return (
    <div className={classNames(sc())}>
      <Badge count={newMessageCount}>
        <Avatar
          className={classNames(sc("avatar"))}
          icon="user"
          shape="square"
          size="large"
        />
      </Badge>
      <div className={classNames(sc("info"))}>
        <span className={classNames(sc("name"))}>{name}</span>
        <span className={classNames(sc("message"))}>{message}</span>
      </div>
    </div>
  );
};

export default SessionItem;
export { SessionItemProps };
