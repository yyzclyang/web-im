import React from "react";
import { Avatar } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import { Message } from "@/store/reducer/message";
import "./messageBubble.scss";
import { ChatType } from "@/page/chat";

const sc = scopedClassMaker("message-bubble");

interface MessageBubbleProps {
  chatType: ChatType;
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = (
  props: MessageBubbleProps
) => {
  const {
    chatType,
    message: { from, data }
  } = props;
  return (
    <div className={classNames(sc(), from ? sc("other-side") : sc("mine"))}>
      <div className={classNames(sc("text-wrapper"))}>
        {chatType === "groupchat" && from ? (
          <span className={classNames(sc("name"))}>{from}</span>
        ) : null}
        <span className={classNames(sc("text"))}>{data}</span>
      </div>
      <Avatar className={classNames(sc("avatar"))} icon="user" shape="square" />
    </div>
  );
};

export default MessageBubble;
