import { Dispatch } from "redux";
import WebIM, {
  SignUpData,
  SignUpSuccessResult,
  SignUpErrorResult,
  SignInData,
  SignInSuccessResult
} from "@/config/WebIM";
import { hideLoading, showLoading } from "./loading";

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
const changeStateActionGenerator = <T extends keyof SignActionTypeList>(
  type: T
): ((state: SignActionTypeList[T]) => SignAction<T>) => {
  return (state) => ({
    type,
    payload: {
      state
    }
  });
};

// 注册状态： 0 未操作，1 注册中，2 注册成功，-1 注册失败
const changeSignUpState = changeStateActionGenerator("CHANGE_SIGN_UP_STATE");

const signUpAction = ({
  username,
  password,
  nickname,
  successFn,
  errorFn
}: SignUpData) => {
  return (dispatch: Dispatch): Promise<SignUpSuccessResult> => {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: SignUpSuccessResult) => {
        dispatch(changeSignUpState(2));
        dispatch(hideLoading());
        successFn && successFn(result);
        resolve(result);
      };
      const onError = (error: SignUpErrorResult) => {
        dispatch(changeSignUpState(-1));
        dispatch(hideLoading());
        errorFn && errorFn(error);
        reject(error);
      };

      dispatch(changeSignUpState(1));
      dispatch(showLoading());
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

// 登录状态： 0 未操作，1 登录中，2 登录成功，-1 登录失败
const changeSignInState = changeStateActionGenerator("CHANGE_SIGN_IN_STATE");

const signInAction = ({
  username,
  password,
  successFn,
  errorFn
}: SignInData) => {
  return (dispatch: Dispatch): Promise<SignInSuccessResult> => {
    return new Promise((resolve, reject) => {
      const onSuccess = (result: SignInSuccessResult) => {
        dispatch(changeSignUpState(2));
        dispatch(hideLoading());
        successFn && successFn(result);
        resolve(result);
      };
      const onError = () => {
        dispatch(changeSignUpState(-1));
        dispatch(hideLoading());
        errorFn && errorFn();
        reject();
      };

      dispatch(changeSignUpState(1));
      dispatch(showLoading());
      WebIM.signInWithPassword({
        username,
        password,
        successFn: onSuccess,
        errorFn: onError
      });
    });
  };
};

export {
  SignActionTypeList,
  SignAction,
  signUpAction,
  changeSignUpState,
  signInAction,
  changeSignInState
};
