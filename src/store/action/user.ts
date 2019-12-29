interface UserInfo {
  activated?: boolean;
  created?: number;
  modified?: number;
  type?: string;
  username?: string;
  uuid?: string;
}

interface UserActionTypeList {
  CHANGE_USER_INFO: UserInfo;
}

interface UserAction<K extends keyof UserActionTypeList> {
  type: K;
  payload: {
    state: UserActionTypeList[K];
  };
}

const changeUserInfo = (userInfo: UserInfo): UserAction<"CHANGE_USER_INFO"> => {
  return {
    type: "CHANGE_USER_INFO",
    payload: {
      state: userInfo
    }
  };
};

export { UserActionTypeList, UserAction, changeUserInfo };
