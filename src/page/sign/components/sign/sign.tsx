import React from "react";
import { classNames, scopedClassMaker } from "@/utils";
import "./sign.scss";

const sc = scopedClassMaker("sign");

interface SignProps {
  children?: React.ReactNode;
}

const Sign: React.FC<SignProps> = (props: SignProps) => {
  return <div className={classNames(sc())}>{props.children}</div>;
};

export default Sign;
