import React from "react";
import { Menu, Icon } from "antd";
import { MenuProps } from "antd/lib/menu";
import { classNames, scopedClassMaker } from "@/utils";
import "./popMenu.scss";

const sc = scopedClassMaker("add-menu");

interface MenuItem {
  key: string;
  icon: string;
  title: string;
}
interface PopMenuProps extends MenuProps {
  menuItemList: Array<MenuItem>;
}

const PopMenu: React.FC<PopMenuProps> = (props: PopMenuProps) => {
  const { menuItemList, ...restProps } = props;

  return (
    <Menu className={classNames(sc())} {...restProps}>
      {menuItemList.map(({ key, icon, title }) => {
        return (
          <Menu.Item key={key} className={classNames(sc("item"))}>
            <span>
              <Icon style={{ fontSize: "14px" }} type={icon} />{" "}
              <span>{title}</span>
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default PopMenu;
