import React from "react";
import { classNames, scopedClassMaker } from "@/utils";
import "./sessionItem.scss";

const sc = scopedClassMaker("session-item");

interface SessionItemProps {
  jid: string;
  name: string;
  subscription: "both" | "to" | "from";
}

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
