import { combineReducers } from "redux";
import signReducer, { SignStateType } from "./sign";

const reducers = combineReducers({
  sign: signReducer
});

interface StoreType {
  sign: SignStateType;
}

export default reducers;
export { StoreType };
