import axios from "axios";
import {
  LOGIN_USER,
  AUTH_USER,
  REGISTER_USER,
  USER_SERVER,
  LOGOUT_USER,
  GET_ERRORS,
} from "./types";
import authService from "../external/authService";
import axiosService from "../external/axiosService";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "./asyncActions";
import { endpoint, prodEndpoint } from "../../config";
const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint;
const axiosInstance = axiosService.getInstance();

export function registerUser(dataToSubmit) {
  //   const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
  //       .then(response => response.data);
  //   return {
  //       type: REGISTER_USER,
  //       payload: request
  //   }
}

export function loginUser(dataToSubmit, history) {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const response = await axios.post(
        `${URL}api/v1/users/login`,
        dataToSubmit
      );

      if (response.data.success) {
        await authService.setToken(response.data.token);
        history.push("/admin");
        dispatch(asyncActionFinish());
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: response.data.message,
        });
      }
    } catch (error) {}
  };
}

export function fbLogin(dataToSubmit, history) {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const response = await axios.post(
        `${URL}api/v1/users/fblogin`,
        dataToSubmit
      );

      if (response) {
        console.log(response.data.token);
        await authService.setToken(response.data.token);

        history.push("/user");
        dispatch(asyncActionFinish());
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function auth(history, reload) {
  //   const request = axios.get(`${USER_SERVER}/auth`)
  //   .then(response => response.data);

  //   return {
  //       type: AUTH_USER,
  //       payload: request
  //   }

  return async (dispatch) => {
    try {
      const userData = await axiosInstance.get("/users/auth");

      dispatch({
        type: AUTH_USER,
        payload: userData.data,
      });

      // kick user out
      if (!userData.data.isAuth && !reload) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const logoutUser = (history) => (dispatch) => {
  authService.deleteToken();
  window.location.reload();
};
