import React, { ChangeEventHandler, useState } from "react";
import { Icon, Input } from "antd";
import { useDispatch } from "react-redux";
import { classNames, scopedClassMaker } from "@/utils";
import { FriendInfo, TextMessage } from "@/config/WebIM";
import { addMessage, sendMessageAction } from "@/store/action";
import { Message } from "@/store/reducer/message";
import store from "@/store";
import "./chatPanel.scss";

const { TextArea } = Input;

const sc = scopedClassMaker("chat-panel");

interface ChatPanelProps {
  chatId?: string;
  friendInfo?: FriendInfo;
  messageList: Array<Message>;
}

const ChatPanel: React.FC<ChatPanelProps> = (props: ChatPanelProps) => {
  const { chatId, friendInfo, messageList } = props;
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const sendMessageByEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = () => {
    sendMessageAction(chatId!, value)(dispatch);
    // antd 的 bug，不延迟清空后会留有一个回车
    setTimeout(() => {
      setValue("");
    });
  };

  return (
    <div className={classNames(sc())}>
      {Boolean(chatId) ? (
        <>
          <div className={classNames(sc("title"))}>
            <span className={classNames(sc("name"))}>{friendInfo?.name}</span>
          </div>
          <div className={classNames(sc("message-list"))}>
            {messageList.map((message) => (
              <div key={message.time}>{message.data}</div>
            ))}
          </div>
          <div className={classNames(sc("input-area"))}>
            <TextArea
              placeholder="请输入消息"
              className={classNames(sc("textarea"))}
              autoSize={{ minRows: 3, maxRows: 5 }}
              value={value}
              onChange={onChange}
              onPressEnter={sendMessageByEnter}
            />
          </div>
        </>
      ) : (
        <div className={classNames(sc("inactive"))}>
          <Icon className={classNames(sc("inactive-icon"))} type="wechat" />
        </div>
      )}
    </div>
  );
};

const receiveTextMessage = (message: TextMessage) => {
  store.dispatch(
    addMessage({
      type: message.type,
      status: "fulfilled",
      dialogue: message.from,
      to: message.to,
      from: message.from,
      data: message.data,
      time: message.time,
      mid: message.id
    })
  );
};

export default ChatPanel;
export { receiveTextMessage };
