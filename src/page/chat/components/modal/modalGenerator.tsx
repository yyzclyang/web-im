import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal/Modal";
import AddFriendModalCom from "./addFriend";

type AddModalType = "add-friend" | "join-group" | "create-group";
type SettingModalType = "setting";
type ModalType = AddModalType | SettingModalType;

interface Options extends ModalProps {
  type: ModalType;
  visible: boolean;
  onClose: (type: Options["type"]) => void;
}

const modalGenerator = (options: Options) => {
  const { type, visible, onClose } = options;
  const com = (
    <AddFriendModalCom
      onClick={() => {
        onClose(type);
      }}
    />
  );

  return (
    <Modal key={type} visible={visible}>
      {com}
    </Modal>
  );
};

export default modalGenerator;
export { AddModalType, SettingModalType, ModalType };
