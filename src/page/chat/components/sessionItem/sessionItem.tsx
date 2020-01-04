import React from "react";
import { Avatar } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";
import { FriendInfo } from "@/config/WebIM";

const sc = scopedClassMaker("session-item");

interface SessionItemProps {
  friendInfo: FriendInfo;
}

const SessionItem: React.FC<SessionItemProps> = (props: SessionItemProps) => {
  const {
    friendInfo: { name }
  } = props;
  return (
    <div className={classNames(sc())}>
      <Avatar className={classNames(sc("avatar"))} icon="user" shape="square" />
      <span className={classNames(sc("name"))}>{name}</span>
    </div>
  );
};

export default SessionItem;
export { SessionItemProps };
