import React, { useState } from "react";
import { Avatar, Icon, Dropdown, Modal } from "antd";
import { ClickParam } from "antd/lib/menu";
import { classNames, scopedClassMaker } from "@/utils";
import PopMenu from "../popMenu";
import modalGenerator, {
  AddModalType,
  SettingModalType,
  ModalType
} from "../modal";

import "./slideBar.scss";

const sc = scopedClassMaker("chat-slide-bar");

type ModalVisibleValue = {
  [type in ModalType]: boolean;
};
interface AddMenuItem {
  key: AddModalType;
  icon: string;
  title: string;
}
interface SettingMenuItem {
  key: SettingModalType;
  icon: string;
  title: string;
}

const SlideBar: React.FC = () => {
  const modalType: Array<ModalType> = [
    "add-friend",
    "join-group",
    "create-group",
    "setting"
  ];
  const [modalVisibleValue, setModalVisibleValue] = useState<ModalVisibleValue>(
    () => {
      return modalType.reduce(
        (value, type) => ({ ...value, [type]: false }),
        {}
      ) as ModalVisibleValue;
    }
  );
  const setModalVisible = (type: ModalType, visible: boolean) => {
    setModalVisibleValue((visibleValue) => {
      return { ...visibleValue, [type]: visible };
    });
  };

  const addMenuItemList: Array<AddMenuItem> = [
    {
      key: "add-friend",
      icon: "user-add",
      title: "添加好友"
    },
    {
      key: "join-group",
      icon: "plus-circle-o",
      title: "加入群组"
    },
    {
      key: "create-group",
      icon: "usergroup-add",
      title: "创建群组"
    }
  ];
  const addMenuOnClick = ({ key }: ClickParam) => {
    setModalVisible(key as ModalType, true);
  };

  return (
    <div className={classNames(sc())}>
      <Avatar
        className={classNames(sc("avatar"))}
        icon="user"
        size="large"
        shape="square"
      />
      <Icon className={classNames(sc("icon"))} type="user" />
      <Icon className={classNames(sc("icon"))} type="team" />
      <div className={sc("icon-placeholder")} />
      <Dropdown
        overlay={
          <PopMenu onClick={addMenuOnClick} menuItemList={addMenuItemList} />
        }
        placement="topLeft"
        trigger={["click"]}
      >
        <Icon className={classNames(sc("icon"))} type="plus-circle" />
      </Dropdown>
      <Icon className={classNames(sc("icon"))} type="setting" />
      {modalType.map((type) =>
        modalGenerator({
          type,
          visible: modalVisibleValue[type],
          onClose: () => {
            setModalVisible(type, false);
          }
        })
      )}
    </div>
  );
};

export default SlideBar;
