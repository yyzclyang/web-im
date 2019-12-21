import { SignAction, SignActionTypeList } from "@/store/action";

interface SignStateType {
  signUpState: number;
  signInState: number;
}

const signReducer = (
  state = {
    signUpState: 0, // signUpState-注册状态： 0 未操作，1 注册中，1 注册成功，-1 注册失败
    signInState: 0
  },
  action: SignAction<keyof SignActionTypeList>
) => {
  switch (action.type) {
    case "CHANGE_SIGN_UP_STATE": {
      return { ...state, signUpState: action.payload.state };
    }
    case "CHANGE_SIGN_IN_STATE": {
      return { ...state, signInState: action.payload.state };
    }
    default: {
      return state;
    }
  }
};

export default signReducer;
export { SignStateType };
