require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./routes/user_route");
const location = require("./routes/location_route");
const { joinsocketroom } = require("./utils/sockethelpers/joinroom");
const {
  readylist,
  emitmapifallready,
} = require("./utils/sockethelpers/user-ready");
const { emitdistance } = require("./utils/sockethelpers/user-guess");
const {
  markandemitonallcomplete,
} = require("./utils/sockethelpers/completion");
const {
  userreadydisconnect,
  allcompleteddisconnect,
} = require("./utils/sockethelpers/disconnect");
const {
  makeready,
  resetuser,
  numofplayerinroom,
  checkallcompleted,
} = require("./utils/queries/userqueries");
const {
  getGameMapStatus,
  deleteGameMap,
} = require("./utils/queries/mapqueries");


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb...", err));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

server.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});

app.use("/user", user);
app.use("/location", location);


io.on("connection", (socket) => {
  console.log(`new socket connection ${socket.id} `);

  socket.on("join-room", async ({ name, roomid }) => {
    await joinsocketroom(name, roomid, socket);
    await readylist(io, roomid);
  });

  socket.on("user-ready", async ({ name, roomid }) => {
    await makeready(name);
    await readylist(io, roomid);
    await emitmapifallready(io, roomid);
  });

  socket.on("user-guess", async ({ name, mapname, urselection, index }) => {
    await emitdistance(socket, name, mapname, urselection, index);
  });

  socket.on("completed", async ({ name, roomid }) => {
    await markandemitonallcomplete(io, socket, name, roomid);
  });

  socket.on("disconnect", async () => {
    console.log(
      `user ${socket.username && socket.username.name} with socket id ${
        socket.id
      } has been disconnected`
    );

    if (socket.username) {
      const roomid = await resetuser(socket.username.name);
      console.log(
        `user ${socket.username.name} resetted and the room id ${roomid}`
      );
      if (roomid) {
        const { isCompleted, hasStarted } = await getGameMapStatus(roomid);
        console.log(`isCompleted: ${isCompleted}, hasStarted:${hasStarted}`);
        if (isCompleted) {
          await deleteGameMap(roomid);
        } else {
          if (!hasStarted) {
            const islast = await numofplayerinroom(roomid);
            console.log(`islast: ${islast}`);
            if (!islast) {
              await userreadydisconnect(io, socket, roomid);
            }
          } else {
            const allCompleted = await checkallcompleted(roomid);
            if (allCompleted) {
              await allcompleteddisconnect(socket, roomid);
            }
          }
        }
      }
    }
  });
});
