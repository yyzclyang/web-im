import React, { useState } from "react";
import { Input, Button, message, Modal } from "antd";
import WebIM, { PresenceMessage } from "@/config/WebIM";
import { classNames, scopedClassMaker } from "@/utils";
import store from "@/store";
import { changeFriendsList } from "@/store/action";
import "./addFriend.scss";

const sc = scopedClassMaker("modal-add-friend");

interface AddFriendProps {
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const AddFriend: React.FC<AddFriendProps> = (props: AddFriendProps) => {
  const { onClick } = props;

  const [value, setValue] = useState<string>("");
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };
  const addFriend: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (e) => {
    const realValue = value.trim();
    if (realValue) {
      WebIM.addFriend(value.trim());
      setValue("");
      onClick(e);
    } else {
      message.error("好友 ID 不能为空！");
    }
  };
  return (
    <div className={classNames(sc())}>
      <Input placeholder="好友 ID" onChange={onChange} />
      <Button
        className={classNames(sc("button"))}
        onClick={addFriend}
        type="primary"
      >
        添加
      </Button>
    </div>
  );
};

const friendRequest = (message: PresenceMessage<"subscribe">) => {
  const acceptRequest = () => {
    WebIM.acceptFriendRequest(message.from);
  };
  const declineRequest = () => {
    WebIM.declineFriendRequest(message.from);
  };

  Modal.confirm({
    icon: null,
    title: "好友申请",
    width: 480,
    okText: "同意",
    onOk: acceptRequest,
    cancelText: "拒绝",
    onCancel: declineRequest,
    content: (
      <span>
        {message.from}：{message.status}
      </span>
    )
  });
};
const addFriendStatusMessage = (message: PresenceMessage<"subscribed">) => {
  WebIM.getFriend().then((result) => {
    store.dispatch(changeFriendsList(result));
  });
  Modal.info({
    icon: null,
    title: "好友添加消息",
    width: 480,
    okText: "知道了",
    content: <span>您已添加 {message.from} 为好友</span>
  });
};

export default AddFriend;
export { friendRequest, addFriendStatusMessage };
