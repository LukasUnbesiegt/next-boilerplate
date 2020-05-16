import { createStore, applyMiddleware } from "redux";
import { reducers } from "./reducers/index";
import Thunk from "redux-thunk";
import io from "socket.io-client";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import {
  socketIOEmitterMiddleware,
  socketIOSubscriberMiddleware,
} from "./middlewares/socket";
import { responsiveStoreEnhancer } from "redux-responsive";
import { endpoint_ws, prodEndpoint_ws } from "../config";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
const URL =
  process.env.NODE_ENV === "development" ? endpoint_ws : prodEndpoint_ws;
// const socket = io.connect(URL);

const configureStore = (preloadedState) => {
  const middlewares = [
    Thunk,
    routerMiddleware(),
    // socketIOSubscriberMiddleware(socket),
    // socketIOEmitterMiddleware(socket),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer, responsiveStoreEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  return createStore(reducers(), preloadedState, composedEnhancer);
};

const wrapper = createWrapper(configureStore, { debug: true });

export { configureStore, wrapper };
