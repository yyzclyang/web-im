import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";
import { FriendData } from "@/config/WebIM";
import { ChatType } from "../../chat";

const sc = scopedClassMaker("session-item");

interface SessionItemProps {
  chatType: ChatType;
  friendInfo: FriendData;
}

const SessionItem: React.FC<SessionItemProps> = (props: SessionItemProps) => {
  const {
    chatType,
    friendInfo: { name }
  } = props;
  return (
    <NavLink
      to={`/chat/${chatType}/${name}`}
      replace
      className={classNames(sc())}
    >
      <Avatar className={classNames(sc("avatar"))} icon="user" shape="square" />
      <span className={classNames(sc("name"))}>{name}</span>
    </NavLink>
  );
};

export default SessionItem;
export { SessionItemProps };
