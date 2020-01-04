import { FriendInfo } from "@/config/WebIM";
import { FriendsAction, FriendsActionTypeList } from "../action";

type FriendsListType = Array<FriendInfo>;

const friendsListReducer = (
  state: FriendsListType = [],
  action: FriendsAction<keyof FriendsActionTypeList>
) => {
  switch (action.type) {
    case "CHANGE_FRIENDS_LIST": {
      return action.payload.state;
    }
    default: {
      return state;
    }
  }
};

export default friendsListReducer;
export { FriendsListType };
