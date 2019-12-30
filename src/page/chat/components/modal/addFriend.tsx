import React, { useState } from "react";
import { Input, Button } from "antd";

interface AddFriendModalComProps {
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const AddFriendModalCom: React.FC<AddFriendModalComProps> = (
  props: AddFriendModalComProps
) => {
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
  const addButton = <Button onClick={addFriend}>添加</Button>;
  return (
    <div>
      <Input onChange={onChange} addonAfter={addButton} />
    </div>
  );
};

export default AddFriendModalCom;
