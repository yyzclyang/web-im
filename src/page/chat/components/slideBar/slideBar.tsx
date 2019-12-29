import React from "react";
import { Avatar, Icon, Dropdown } from "antd";
import { ClickParam } from "antd/lib/menu";
import { classNames, scopedClassMaker } from "@/utils";
import PopMenu from "../popMenu";

import "./slideBar.scss";

const sc = scopedClassMaker("chat-slide-bar");

const SlideBar: React.FC = () => {
  const menuItemList = [
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
  const menuOnClick = ({ key }: ClickParam) => {
    console.log(key);
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
        overlay={<PopMenu onClick={menuOnClick} menuItemList={menuItemList} />}
        placement="topLeft"
        trigger={["click"]}
      >
        <Icon className={classNames(sc("icon"))} type="plus-circle" />
      </Dropdown>
      <Icon className={classNames(sc("icon"))} type="setting" />
    </div>
  );
};

export default SlideBar;
