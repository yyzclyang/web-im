import { SignAction, SignActionTypeList } from "@/store/action";

interface SignStateType {
  signState: number;
}

const signReducer = (
  state = { signState: 0 },
  action: SignAction<keyof SignActionTypeList>
) => {
  switch (action.type) {
    case "LOGIN_START": {
      return { ...state, signState: action.payload.state };
    }
    default: {
      return state;
    }
  }
};

export default signReducer;
export { SignStateType };
