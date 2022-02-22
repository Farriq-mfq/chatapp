const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authrouter = require("./router/AuthRouter");
require("./DB");
const env = require("dotenv");
env.config();
const auth = require("./middleware/auth");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/AuthModel");
const MessageModel = require("./models/MessageModel");
const moment = require("moment");
moment.locale("id");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_HTTP_ORIGIN, credentials: true },
});
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_HTTP_ORIGIN,
    optionsSuccessStatus: 200,
  })
);

io.use((socket, next) => {
  try {
    if (jwt.verify(socket.handshake.auth.token, process.env.JWT_KEY)) {
      return next();
    }
  } catch {
    const err = new Error("Authentikasi error");
    err.data = { content: "Auhtentikasi perlu !!!  " };
    // console.log(err.data);
  }
});
let socketList = [];
io.on("connection", async (socket) => {
  socket.on("set Rooms", async (id) => {
    socket.leave(socket.id);
    if (socketList[`${id}_${user._id}`] != undefined) {
      await socket.leave(socketList[`${id}_${user._id}`]);
      await socket.join(socketList[`${id}_${user._id}`]);
    } else if (socketList[`${user._id}_${id}`] != undefined) {
      await socket.leave(socketList[`${user._id}_${id}`]);
      await socket.join(socketList[`${user._id}_${id}`]);
    } else {
      socketList[`${id}_${user._id}`] = new Date().getTime();
    }
  });
  // user CORE__
  const user = jwt.decode(socket.handshake.auth.token);
  // get all user
  let newResponse = [];
  const UserALL = await User.find({
    _id: {
      $ne: user._id,
    },
  })
    .select({
      password: 0,
    })
    .exec();
  socket.emit("user", UserALL);

  socket.on("ketik", (id) => {
    if (socketList[`${id}_${user._id}`] != undefined) {
      io.to(socketList[`${id}_${user._id}`]).emit("ketik", id);
    } else if (socketList[`${user._id}_${id}`] != undefined) {
      io.to(socketList[`${user._id}_${id}`]).emit("ketik", id);
    }
  });
  socket.on("endketik", (id) => {
    if (socketList[`${id}_${user._id}`] != undefined) {
      io.to(socketList[`${id}_${user._id}`]).emit("endketik");
    } else if (socketList[`${user._id}_${id}`] != undefined) {
      io.to(socketList[`${user._id}_${id}`]).emit("endketik");
    }
  });

  // getmessage
  socket.on("message", (data) => {
    const message = new MessageModel({
      message: data.message,
      id_penerima: data.id_penerima,
      id_pengirim: data.id_pengirim,
      date: data.date,
      is_read: false,
    });
    message.save().then(async () => {
      await MessageModel.find({
        $or: [
          {
            id_penerima: data.id_penerima,
            id_pengirim: data.id_pengirim,
          },
          {
            id_penerima: data.id_pengirim,
            id_pengirim: data.id_penerima,
          },
        ],
      })
        .sort({
          date: 1,
        })
        .exec()
        .then(async (res) => {
          User.findOne({
            _id: data.id_penerima,
          }).then((UserCHeck) => {
            if (UserCHeck.status == "online") {
              if (
                socketList[`${data.id_penerima}_${data.id_pengirim}`] !=
                undefined
              ) {
                io.to(
                  socketList[`${data.id_penerima}_${data.id_pengirim}`]
                ).emit("messageShow", res);
              } else if (
                socketList[`${data.id_pengirim}_${data.id_penerima}`] !=
                undefined
              ) {
                io.to(
                  socketList[`${data.id_pengirim}_${data.id_penerima}`]
                ).emit("messageShow", res);
              }
            } else {
              socket.emit("messageShow", res);
            }
          });
        });
    });
  });
  //update status
  socket.on("disconnect", async () => {
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          status: "offline",
          last_online: moment().format(),
        },
      }
    ).then(() => {
      console.log(user._id + " OFFFLINE");
    });
  });
  // find by self
  socket.on("connect_user", async () => {
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          status: "online",
          last_online: moment().format(),
        },
      }
    ).then(async () => {
      const getUserByID = await User.findOne({ _id: user._id });
      socket.emit("getUSer", {
        _id: getUserByID._id,
        name: getUserByID.name,
        email: getUserByID.email,
        status: getUserByID.status,
      });
      // get user chat
      socket.on("getUSerChat", async (id) => {
        console.log(id);
        const data = await User.findOne({
          _id: {
            $eq: id,
          },
        });
        socket.emit("showUserCHat", {
          _id: data._id,
          name: data.name,
          email: data.email,
          status: data.status,
        });
        await MessageModel.find({
          $or: [
            {
              id_penerima: id,
              id_pengirim: user._id,
            },
            {
              id_penerima: user._id,
              id_pengirim: id,
            },
          ],
        })
          .sort({
            date: 1,
          })
          .exec()
          .then((res) => {
            socket.emit("messageShow", res);
          });
      });
    });
  });
});
app.use("/", auth, authrouter);
server.listen(2000, () => {
  console.log("SERVER running");
});
