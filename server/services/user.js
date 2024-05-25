const GameMap = require("../models/gameMap_model");
const User = require("../models/user_model");

async function createuser(name) {
  const existingUser = await User.findOne({ name });
  if (existingUser) {
    console.log("Name already taken");
    return "Name already taken";
  }

  let user = new User({
    name: name,
    isAdmin: false,
    isReady: false,
    completed: false,
    points: 0,
  });
  await user.save();
}

async function joinroom(gamename, room) {
  try {
    let gamemap = await GameMap.findOne({ room: room });

    if (gamemap && !gamemap.hasStarted) {
      const { name } = gamename;
      let user = await User.findOne({ name: name });
      user.room = room;
      await user.save();
      return "Joined room successfully";
    } else {
      if (!gamemap) {
        return "Invalid room id";
      } else {
        return "Match has already started";
      }
    }
  } catch (error) {
    console.log("error while joining room" + error);
  }
}

async function listofusersinroom(room) {
  let list = await User.find({ room: room });
  return list;
}

async function getUsersReadyInRoom(roomNumber) {
  try {
    const readyUserCount = await User.countDocuments({
      room: roomNumber,
      isReady: true,
    });
    return readyUserCount;
  } catch (error) {
    console.error("Error getting ready users in room:", error);
    throw error;
  }
}

async function makeready(gamename) {
  try {
    const { name } = gamename;
    let user = await User.findOne({ name: name });
    user.isReady = !user.isReady;
    await user.save();
    console.log(`user ${name} is ${user.isReady ? "ready" : "not-ready"}`);
  } catch (error) {
    console.log("error while marking user ready" + error);
  }
}

async function markpoints(gamename, point) {
  const { name } = gamename;
  let user = await User.findOne({ name: name });
  user.points = user.points + point;
  await user.save();
}

async function checkallcompleted(room) {
  try {
    let users = await User.find({ room: room });
    const allCompleted = users.every((user) => user.completed === true);
    console.log(`all completed ${allCompleted}`);
    return allCompleted;
  } catch (error) {
    console.log("error while checking whether all completed" + error);
  }
}

async function markandcheck(gamename, room) {
  try {
    const { name } = gamename;
    let user = await User.findOne({ name: name });
    console.log("markandcheck user-----" + user.name);
    user.completed = true;
    await user.save();

    return await checkallcompleted(room);
  } catch (error) {
    console.log(
      "error while marking and checking whether all completed" + error
    );
  }
}

async function resetuser(name) {
  try {
    let user = await User.findOne({ name: name });
   
    const roomid = user.room;
    user.isReady = false;
    user.points = 0;
    user.completed = false;
    user.room = null;
    await user.save();

    let gamemap = await GameMap.findOne({ room: roomid });

    return { roomid, gamemap };
  } catch (error) {
    console.log("error while resetting user" + error);
  }
}

async function numofplayerinroom(room) {
  try {
    let users = await User.find({ room: room });
    let count = 0;
    for (const user of users) {
      if (user.room == room) {
        let count = count + 1;
      }
    }
    if (count == 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error while checking number of players in room " + error);
  }
}

module.exports = {
  createuser,
  joinroom,
  listofusersinroom,
  getUsersReadyInRoom,
  makeready,
  markpoints,
  checkallcompleted,
  markandcheck,
  resetuser,
  numofplayerinroom,
};
