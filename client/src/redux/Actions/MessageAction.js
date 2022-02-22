import Socket from "../../Socket";

function getID(id) {
  return async (dispatch) => {
    try {
      Socket.emit("getUSerChat", id);
      Socket.on("showUserCHat", (user_recaive) => {
        Socket.emit("set Rooms", id);
        dispatch({
          type: "GET_ID",
          payload: {
            user_recaive,
          },
        });
      });
    } catch {
      console.error("error");
    }
  };
}
function sendMessage(data) {
  return async (dispatch) => {
    Socket.emit("message", data);
  };
}
function Getuser() {
  return async (dispatch) => {
    try {
      await Socket.on("user", (userData) => {
        dispatch({
          type: "GET_MESSAGE_USERS",
          payload: {
            userData,
          },
        });
      });
    } catch {
      console.error("Get users error");
    }
  };
}
export { getID, sendMessage, Getuser };
