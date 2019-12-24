import ReactDOM from "react-dom";
import React from "react";
import { Spin } from "antd";
import { classNames, scopedClassMaker } from "@/utils";
import { StoreType } from "@/store";
import { useShallowEqualSelector } from "@/hooks";
import "./loading.scss";

const sc = scopedClassMaker("web-im-loading");

const Loading: React.FC = () => {
  const loadingState = useShallowEqualSelector(
    (store: StoreType) => store.loading
  );
  return ReactDOM.createPortal(
    loadingState.visible ? (
      <Spin className={classNames(sc())} size="large" />
    ) : null,
    document.body
  );
};

export default Loading;
