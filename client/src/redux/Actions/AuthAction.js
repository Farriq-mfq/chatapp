import axios from "axios";
import config from "../../config";
import Socket from "../../Socket.js";
function LoginAction(credentials) {
  return async (dispatch) => {
    await axios
      .post(`${config.api_url}/login`, credentials)
      .then((response) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_FAILED",
          payload: err.response.data,
          errorCode: err.response.status,
        });
      });
  };
}
function RegisterAction(credentials) {
  return async (dispatch) => {
    await axios
      .post(`${config.api_url}/register`, credentials)
      .then((response) => {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "REGISTER_FAILED",
          payload: err.response.data,
        });
      });
  };
}
function GetUserBYID() {
  return async (dispatch) => {
    Socket.on("getUSer", (user) => {
      dispatch({
        type: "GET_USER",
        payload: user,
      });
    });
  };
}
function LogoutAction() {
  return async (dispatch) => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  };
}

export { LoginAction, GetUserBYID, LogoutAction, RegisterAction };
