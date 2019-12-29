import React from "react";
import { Avatar, Icon } from "antd";
import { classNames, scopedClassMaker } from "@/utils";

import "./slideBar.scss";

const sc = scopedClassMaker("chat-slide-bar");

const SlideBar: React.FC = () => {
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
      <Icon className={classNames(sc("icon"))} type="plus-circle" />
      <Icon className={classNames(sc("icon"))} type="setting" />
    </div>
  );
};

export default SlideBar;
