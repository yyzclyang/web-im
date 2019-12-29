import React from "react";
import { classNames, scopedClassMaker } from "@/utils";
import "./sign.scss";
import "@/assets/images/logo.svg";

const sc = scopedClassMaker("sign");

interface SignProps {
  children?: React.ReactNode;
}

const Sign: React.FC<SignProps> = (props: SignProps) => {
  return (
    <div className={classNames(sc())}>
      <svg className={classNames(sc("page-logo"))}>
        <use xlinkHref={`#logo`} />
      </svg>
      {props.children}
    </div>
  );
};

export default Sign;
