import { Dispatch } from "redux";
import WebIM, { FriendResult } from "@/config/WebIM";
import { FriendsListType } from "../reducer/friends";
import { message } from "antd";

interface FriendsActionTypeList {
  CHANGE_FRIENDS_LIST: FriendsListType;
}
interface FriendsAction<K extends keyof FriendsActionTypeList> {
  type: K;
  payload: {
    state: FriendsActionTypeList[K];
  };
}

const changeFriendsList = (
  friendsList: FriendsListType
): FriendsAction<"CHANGE_FRIENDS_LIST"> => {
  return {
    type: "CHANGE_FRIENDS_LIST",
    payload: {
      state: friendsList
    }
  };
};

const getFriendsListAction = () => {
  return (dispatch: Dispatch) => {
    return WebIM.getFriend()
      .then((result: FriendResult) => {
        dispatch(changeFriendsList(result));
      })
      .catch(() => {
        message.error("获取好友列表失败");
      });
  };
};

export {
  FriendsActionTypeList,
  FriendsAction,
  changeFriendsList,
  getFriendsListAction
};
