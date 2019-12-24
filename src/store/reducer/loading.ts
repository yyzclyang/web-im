import { LoadingActionTypeList, LoadingAction } from "../action";

interface LoadingStateType {
  visible: boolean;
}

const loadingReducer = (
  state = { visible: false },
  action: LoadingAction<keyof LoadingActionTypeList>
) => {
  switch (action.type) {
    case "SHOW_LOADING": {
      return { ...state, visible: action.payload.state };
    }
    case "HIDE_LOADING": {
      return { ...state, visible: action.payload.state };
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
export { LoadingStateType };
