import { combineReducers } from "redux";
import signReducer, { SignStateType } from "./sign";
import loadingReducer, { LoadingStateType } from "./loading";

const reducers = combineReducers({
  sign: signReducer,
  loading: loadingReducer
});

interface StoreType {
  sign: SignStateType;
  loading: LoadingStateType;
}

export default reducers;
export { StoreType };
