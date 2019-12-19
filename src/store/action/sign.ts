interface SignActionTypeList {
  LOGIN_START: number;
}

interface SignAction<K extends keyof SignActionTypeList> {
  type: K;
  payload: {
    state: SignActionTypeList[K];
  };
}

const login = (state: number): SignAction<"LOGIN_START"> => {
  return {
    type: "LOGIN_START",
    payload: {
      state
    }
  };
};

export { SignActionTypeList, SignAction, login };
