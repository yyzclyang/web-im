import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import WebIM, {
  SignUpData,
  SignUpSuccessResult,
  SignUpErrorResult
} from "@/config/WebIM";

interface SignActionTypeList {
  CHANGE_SIGN_IN_STATE: number;
  CHANGE_SIGN_UP_STATE: number;
}

interface SignAction<K extends keyof SignActionTypeList> {
  type: K;
  payload: {
    state: SignActionTypeList[K];
  };
}
// 注册状态： 0 未操作，1 注册中，2 注册成功，-1 注册失败
const changeSignUpState = (
  state: number
): SignAction<"CHANGE_SIGN_UP_STATE"> => {
  return {
    type: "CHANGE_SIGN_UP_STATE",
    payload: {
      state
    }
  };
};

const signUpAction = ({
  username,
  password,
  nickname,
  successFn,
  errorFn
}: SignUpData) => {
  return (dispatch: Dispatch) => {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: SignUpSuccessResult) => {
        successFn && successFn(result);
        dispatch(changeSignUpState(2));
        resolve(result);
      };
      const onError = (error: SignUpErrorResult) => {
        dispatch(changeSignUpState(-1));
        errorFn && errorFn(error);
        reject(error);
      };

      dispatch(changeSignUpState(1));
      WebIM.signUp({
        username,
        password,
        nickname,
        successFn: onSuccess,
        errorFn: onError
      });
    });
  };
};

const changeSignInState = (
  state: number
): SignAction<"CHANGE_SIGN_IN_STATE"> => {
  return {
    type: "CHANGE_SIGN_IN_STATE",
    payload: {
      state
    }
  };
};

export {
  SignActionTypeList,
  SignAction,
  signUpAction,
  changeSignUpState,
  changeSignInState
};
