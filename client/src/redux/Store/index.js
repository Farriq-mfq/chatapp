import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "../Reducer";
const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default Store;
