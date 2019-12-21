import { createStore, applyMiddleware, Middleware } from "redux";
import reducers, { StoreType } from "@/store/reducer";

const middleware: Middleware[] = [];

const store = applyMiddleware(...middleware)(createStore)(reducers);

export default store;
export { StoreType };
