const initstate = {
  user_recaive: null,
  users: null,
};
function MessageReducer(state = initstate, action) {
  const { payload } = action;
  switch (action.type) {
    case "GET_ID":
      state.user_recaive = null;
      state.user_recaive = payload.user_recaive;
      return {
        ...state,
      };
    case "GET_MESSAGE_USERS":
      state.users = payload.userData;
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
export default MessageReducer;
