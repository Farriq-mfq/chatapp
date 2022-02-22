import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MessageReducer from "./MessageReducer";

const RootReducer = combineReducers({
  message: MessageReducer,
  auth: AuthReducer,
});
export default RootReducer;
