import Cookies from "js-cookie";
import config from "../../../config";
import jwt_decode from "jwt-decode";
const initState = {
  user: null,
  error: null,
};
const SetState = () => {
  const token = Cookies.get(config.cookies_param);
  if (token) {
    try {
      const decode = jwt_decode(token);
      initState.user = decode;
      return initState;
    } catch {
      return initState;
    }
  }
  return initState;
};
export default function AuthReducer(state = SetState(), action) {
  const { payload, errorCode } = action;
  switch (action.type) {
    case "LOGIN_SUCCESS":
      Cookies.set(config.cookies_param, payload.token);
      const decode = jwt_decode(payload.token);
      state.user = decode;
      state.error = null;
      window.location.href = "/";
      return {
        ...state,
      };
    case "LOGIN_FAILED":
      state.user = null;
      if (errorCode == 401) {
        state.error = {
          errLogin: true,
        };
      } else {
        state.error = payload.errors;
      }
      return {
        ...state,
      };
    case "REGISTER_SUCCESS":
      state.error = null;

      return {
        successRegister: true,
        ...state,
      };
    case "REGISTER_FAILED":
      state.error = payload.errors;
      return {
        ...state,
      };
    case "GET_USER":
      if (payload) {
        state.user = payload;
      }
      return {
        ...state,
      };
    case "LOGOUT_SUCCESS":
      Cookies.remove(config.cookies_param);
      state.user = null;
      window.location.href = "/login";

      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
