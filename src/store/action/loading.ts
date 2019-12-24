interface LoadingActionTypeList {
  SHOW_LOADING: boolean;
  HIDE_LOADING: boolean;
}
interface LoadingAction<K extends keyof LoadingActionTypeList> {
  type: K;
  payload: {
    state: LoadingActionTypeList[K];
  };
}

const showLoading = () => {
  return {
    type: "SHOW_LOADING",
    payload: {
      state: true
    }
  };
};

const hideLoading = () => {
  return {
    type: "HIDE_LOADING",
    payload: {
      state: false
    }
  };
};

export { LoadingActionTypeList, LoadingAction, showLoading, hideLoading };
