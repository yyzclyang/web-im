import { combineReducers } from "redux";
import signReducer, { SignStateType } from "./sign";
import loadingReducer, { LoadingStateType } from "./loading";
import userReducer, { UserType } from "@/store/reducer/user";

const reducers = combineReducers({
  sign: signReducer,
  loading: loadingReducer,
  user: userReducer
});

interface StoreType {
  sign: SignStateType;
  loading: LoadingStateType;
  user: UserType;
}

export default reducers;
export { StoreType };
