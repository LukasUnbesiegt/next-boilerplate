import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errors from "./errorsReducer";
import localeReducer from "./localeReducer";
import { responsiveStateReducer } from "redux-responsive";
import asyncReducer from "./asyncReducer";
import errorsReducer from "./errorsReducer";

export const reducers = () =>
  combineReducers({
    locale: localeReducer,
    user: userReducer,
    async: asyncReducer,
    errors: errorsReducer,
    browser: responsiveStateReducer,
  });
