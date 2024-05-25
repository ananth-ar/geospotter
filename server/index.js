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
const {
  markandemitonallcomplete,
} = require("./utils/sockethelpers/completion");
const { ondisconnectwithLock } = require("./utils/sockethelpers/disconnect");
const { makeready } = require("./services/user");

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

app.use("/user", user);
app.use("/location", location);

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 3001;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});


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

  socket.on("completed", async ({ name, roomid, points }) => {
    await markandemitonallcomplete(io, name, roomid, points);
  });

  socket.on("disconnect", async () => {
    await ondisconnectwithLock(socket);
  });
});
