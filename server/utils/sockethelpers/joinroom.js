const { joinroom } = require("../queries/userqueries");

async function joinsocketroom(name, roomid, socket) {
  const status = await joinroom(name, roomid);
  if (status === "Joined room successfully") {
    socket.join(roomid);
    socket.username = name;

    console.log(
      `user ${{ name }} id ${
        socket.username && socket.username.name
      } joined ${roomid} room`
    );
  
  } else {
    socket.emit("join-status", status);
    console.log(`from server ${status}`);
  }
}

module.exports = { joinsocketroom };
