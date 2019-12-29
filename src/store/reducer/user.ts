import { UserAction, UserActionTypeList } from "@/store/action";

interface UserType {
  activated?: boolean;
  created?: number;
  modified?: number;
  type: string;
  username: string;
  uuid: string;
}

const userReducer = (
  state = {
    activated: false,
    created: undefined,
    modified: undefined,
    type: "",
    username: "",
    uuid: ""
  },
  action: UserAction<keyof UserActionTypeList>
): UserType => {
  switch (action.type) {
    case "CHANGE_USER_INFO": {
      return { ...state, ...action.payload.state };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
export { UserType };
