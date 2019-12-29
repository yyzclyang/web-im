import React from "react";
import { classNames, scopedClassMaker } from "@/utils";
import "./chatPanel.scss";
import { Icon } from "antd";

const sc = scopedClassMaker("chat-panel");

interface ChatPanelProps {
  active: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = (props: ChatPanelProps) => {
  const { active } = props;

  return (
    <div className={classNames(sc())}>
      {active ? (
        <div>active</div>
      ) : (
        <div className={classNames(sc("inactive"))}>
          <Icon className={classNames(sc("inactive-icon"))} type="wechat" />
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
