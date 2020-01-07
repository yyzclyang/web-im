import { Dispatch } from "redux";
import { message as messageModal } from "antd";
import WebIM from "@/config/WebIM";
import {
  ChangeStatusMessageType,
  Message,
  SetNewMessageCount
} from "../reducer/message";

interface MessageActionTypeList {
  ADD_MESSAGE: Message;
  SET_NEW_MESSAGE_COUNT: SetNewMessageCount;
  CHANGE_MESSAGE_STATUS: ChangeStatusMessageType;
}
interface MessageAction<K extends keyof MessageActionTypeList> {
  type: K;
  payload: {
    state: MessageActionTypeList[K];
  };
}

const addMessage = (message: Message): MessageAction<"ADD_MESSAGE"> => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      state: message
    }
  };
};

const changeMessageStatus = (
  changeStatusMessage: ChangeStatusMessageType
): MessageAction<"CHANGE_MESSAGE_STATUS"> => {
  return {
    type: "CHANGE_MESSAGE_STATUS",
    payload: {
      state: changeStatusMessage
    }
  };
};

const setNewMessageCount = (
  dialogue: string,
  count: number
): MessageAction<"SET_NEW_MESSAGE_COUNT"> => {
  return {
    type: "SET_NEW_MESSAGE_COUNT",
    payload: {
      state: {
        dialogue,
        count
      }
    }
  };
};

const sendMessageAction = (to: string, message: string) => {
  return (dispatch: Dispatch) => {
    const id = WebIM.conn.getUniqueId(); // 生成本地消息id
    dispatch(
      addMessage({
        type: "chat",
        dialogue: to,
        to,
        id,
        data: message,
        time: new Date().getTime().toString(),
        status: "pending",
        isSend: true
      })
    );
    return WebIM.sendSingleMessage(id, to, message)
      .then(() => {
        dispatch(
          changeMessageStatus({
            dialogue: to,
            id,
            status: "fulfilled"
          })
        );
      })
      .catch(() => {
        messageModal.error("消息发送失败!");
        dispatch(
          changeMessageStatus({
            dialogue: to,
            id,
            status: "rejected"
          })
        );
      });
  };
};

export {
  MessageActionTypeList,
  MessageAction,
  addMessage,
  setNewMessageCount,
  sendMessageAction
};
