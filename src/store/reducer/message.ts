import { MessageAction, MessageActionTypeList } from "../action";
import { MessageType } from "@/config/WebIM";

type MessageStatus = "pending" | "fulfilled" | "rejected";

interface Message {
  type?: MessageType;
  status: MessageStatus;
  dialogue: string;
  to: string;
  from?: string;
  id?: number;
  mid?: string;
  time: string;
  data: string;
}
interface ChangeStatusMessageType {
  status: MessageStatus;
  dialogue: string;
  id: number;
}
type MessageListType = {
  [key: string]: Array<Message>;
};

const messageListReducer = (
  state: MessageListType = {},
  action: MessageAction<keyof MessageActionTypeList>
) => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const dialogue = action.payload.state.dialogue;
      return {
        ...state,
        [dialogue]: [...(state[dialogue] ?? []), action.payload.state]
      };
    }
    case "CHANGE_MESSAGE_STATUS": {
      const dialogue = action.payload.state.dialogue;
      return {
        ...state,
        [dialogue]: (state[dialogue] ?? []).map((message) => {
          if (message.id === action.payload.state.id) {
            return { ...message, status: action.payload.state.status };
          }
          return message;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default messageListReducer;
export { MessageStatus, ChangeStatusMessageType, Message, MessageListType };
