import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Icon, Dropdown, Badge } from "antd";
import { ClickParam } from "antd/lib/menu";
import { classNames, scopedClassMaker } from "@/utils";
import PopMenu from "../popMenu";
import modalGenerator, {
  AddModalType,
  SettingModalType,
  ModalType
} from "../modal";
import { ChatType } from "../../chat";

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

interface SlideBarProps {
  singleNewMessageCount: number;
  groupNewMessageCount: number;
}

const SlideBar: React.FC<SlideBarProps> = (props: SlideBarProps) => {
  const { singleNewMessageCount, groupNewMessageCount } = props;

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
      <NavLink to="/chat/singlechat" replace className={classNames(sc("link"))}>
        <span className={classNames(sc("icon-wrapper"))}>
          <Badge count={singleNewMessageCount}>
            <Icon className={classNames(sc("icon"))} type="user" />
          </Badge>
        </span>
      </NavLink>
      <NavLink to="/chat/groupchat" replace className={classNames(sc("link"))}>
        <span className={classNames(sc("icon-wrapper"))}>
          <Badge count={groupNewMessageCount}>
            <Icon className={classNames(sc("icon"))} type="team" />
          </Badge>
        </span>
      </NavLink>

      <div className={sc("icon-placeholder")} />
      <Dropdown
        overlay={
          <PopMenu onClick={addMenuOnClick} menuItemList={addMenuItemList} />
        }
        placement="topLeft"
        trigger={["click"]}
      >
        <span className={classNames(sc("icon-wrapper"))}>
          <Icon className={classNames(sc("icon"))} type="plus-circle" />
        </span>
      </Dropdown>
      <span className={classNames(sc("icon-wrapper"))}>
        <Icon className={classNames(sc("icon"))} type="setting" />
      </span>
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
