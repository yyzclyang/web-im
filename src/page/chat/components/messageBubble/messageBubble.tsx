import React from "react";
import { Avatar } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import { Message } from "@/store/reducer/message";
import "./messageBubble.scss";

const sc = scopedClassMaker("message-bubble");

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = (
  props: MessageBubbleProps
) => {
  const {
    message: { status, from, time, data }
  } = props;
  return (
    <div className={classNames(sc(), from ? sc("other-side") : "")}>
      <span className={classNames(sc("text"))}>{data}</span>
      <Avatar className={classNames(sc("avatar"))} icon="user" shape="square" />
    </div>
  );
};

export default MessageBubble;
