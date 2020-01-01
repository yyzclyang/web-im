import { combineReducers } from "redux";
import signReducer, { SignStateType } from "./sign";
import loadingReducer, { LoadingStateType } from "./loading";
import userReducer, { UserType } from "./user";
import friendsListReducer, { FriendsListType } from "./friends";

const reducers = combineReducers({
  sign: signReducer,
  loading: loadingReducer,
  user: userReducer,
  friends: friendsListReducer
});

interface StoreType {
  sign: SignStateType;
  loading: LoadingStateType;
  user: UserType;
  friends: FriendsListType;
}

export default reducers;
export { StoreType };
