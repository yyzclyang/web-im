import React from "react";
import { Modal } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import AddFriend from "./addFriend";

const sc = scopedClassMaker("chat-modal");

type AddModalType = "add-friend" | "join-group" | "create-group";
type SettingModalType = "setting";
type ModalType = AddModalType | SettingModalType;

interface Options {
  type: ModalType;
  visible: boolean;
  onClose: (type: Options["type"]) => void;
}

const modalGenerator = (options: Options) => {
  const { type, visible, onClose } = options;

  const closeModal = () => {
    onClose(type);
  };
  const modalCom: { [type in ModalType]: React.ReactNode } = {
    "add-friend": <AddFriend onClick={closeModal} />,
    "join-group": <AddFriend onClick={closeModal} />,
    "create-group": <AddFriend onClick={closeModal} />,
    setting: <AddFriend onClick={closeModal} />
  };

  return (
    <Modal
      className={classNames(sc())}
      width={480}
      key={type}
      visible={visible}
      footer={null}
      title="添加好友"
      onCancel={closeModal}
    >
      {modalCom[type]}
    </Modal>
  );
};

export default modalGenerator;
export { AddModalType, SettingModalType, ModalType };
