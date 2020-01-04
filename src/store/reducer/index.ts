import { combineReducers } from "redux";
import signReducer, { SignStateType } from "./sign";
import loadingReducer, { LoadingStateType } from "./loading";
import userReducer, { UserType } from "./user";
import friendsListReducer, { FriendsListType } from "./friends";
import messageListReducer, { MessageListType } from "./message";

const reducers = combineReducers({
  sign: signReducer,
  loading: loadingReducer,
  user: userReducer,
  friends: friendsListReducer,
  messages: messageListReducer
});

interface StoreType {
  sign: SignStateType;
  loading: LoadingStateType;
  user: UserType;
  friends: FriendsListType;
  messages: MessageListType;
}

export default reducers;
export { StoreType };
