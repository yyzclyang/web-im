import { createStore, applyMiddleware } from "redux";
import reducers, { StoreType } from "@/store/reducer";

const middleware: never[] = [];

const store = applyMiddleware(...middleware)(createStore)(reducers);

export default store;
export { StoreType };
