import { MessageAction, MessageActionTypeList } from "../action";
import { MessageType } from "@/config/WebIM";

type MessageStatus = "pending" | "fulfilled" | "rejected";

interface Message {
  type: MessageType;
  status: MessageStatus;
  dialogue: string;
  to: string;
  from?: string;
  id?: number;
  mid?: string;
  time: string;
  data: string;
  isSend?: boolean;
}
interface ChangeStatusMessageType {
  status: MessageStatus;
  dialogue: string;
  id: number;
}
type MessageListType = {
  [key: string]: {
    newMessageCount: number;
    messageData: Array<Message>;
  };
};

interface SetNewMessageCount {
  dialogue: string;
  count: number;
}

const messageListReducer = (
  state: MessageListType = {},
  action: MessageAction<keyof MessageActionTypeList>
) => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const payloadState = action.payload
        .state as MessageActionTypeList["ADD_MESSAGE"];
      const dialogue = payloadState.dialogue;
      return {
        ...state,
        [dialogue]: {
          newMessageCount: payloadState.isSend
            ? 0
            : (state[dialogue]?.newMessageCount ?? 0) + 1,
          messageData: [
            ...(state[dialogue]?.messageData ?? []),
            action.payload.state
          ]
        }
      };
    }
    case "CHANGE_MESSAGE_STATUS": {
      const payloadState = action.payload
        .state as MessageActionTypeList["CHANGE_MESSAGE_STATUS"];
      const dialogue = payloadState.dialogue;
      return {
        ...state,
        [dialogue]: {
          newMessageCount: state[dialogue].newMessageCount,
          messageData: (state[dialogue]?.messageData ?? []).map((message) => {
            if (message.id === payloadState.id) {
              return { ...message, status: payloadState.status };
            }
            return message;
          })
        }
      };
    }
    case "SET_NEW_MESSAGE_COUNT": {
      const payloadState = action.payload
        .state as MessageActionTypeList["SET_NEW_MESSAGE_COUNT"];
      const dialogue = payloadState.dialogue;
      return {
        ...state,
        [dialogue]: {
          newMessageCount: payloadState.count,
          messageData: state[dialogue]?.messageData
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default messageListReducer;
export {
  MessageStatus,
  ChangeStatusMessageType,
  Message,
  MessageListType,
  SetNewMessageCount
};
