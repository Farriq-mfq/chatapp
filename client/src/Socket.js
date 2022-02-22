import Cookies from "js-cookie";
import { io } from "socket.io-client";
import config from "./config";
import jwt_decode from "jwt-decode";
const Socket = new io(config.socket_url, {
  reconnectionDelayMax: 10000,
  auth: {
    token: Cookies.get(config.cookies_param),
  },
});
Socket.on("connect_error", (err) => {
  console.log(err instanceof Error);
  console.log(err.message);
  console.log(err.data);
});
Socket.emit("connect_user");

export default Socket;
