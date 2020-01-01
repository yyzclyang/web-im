import React, { useState } from "react";
import { Input, Button } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
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
    onClick(e);
    console.log(value);
  };
  return (
    <div className={classNames(sc())}>
      <Input placeholder="好友名" onChange={onChange} />
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

export default AddFriend;
