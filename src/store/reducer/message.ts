import { MessageAction, MessageActionTypeList } from "../action";

type MessageStatus = "pending" | "fulfilled" | "rejected";
interface MessageType {
  status: MessageStatus;
  to: string;
  id?: number;
  mid?: string;
  time: string;
  message: string;
}
interface ChangeStatusMessageType {
  status: MessageStatus;
  to: string;
  id: number;
}
type MessageListType = {
  [key: string]: Array<MessageType>;
};

const messageListReducer = (
  state: MessageListType = {},
  action: MessageAction<keyof MessageActionTypeList>
) => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const to = action.payload.state.to;
      return { ...state, [to]: [...(state[to] ?? []), action.payload.state] };
    }
    case "CHANGE_MESSAGE_STATUS": {
      const to = action.payload.state.to;
      return {
        ...state,
        [to]: (state[to] ?? []).map((message) => {
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
export { MessageStatus, ChangeStatusMessageType, MessageType, MessageListType };
