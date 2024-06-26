import { generateRoomId } from "../utils/helper";
import { BASE_URL } from "./url";

export async function savegamename(name, nav) {
  try {
    console.log(JSON.stringify(name));
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });
    if (!response.ok) {
      console.log(response);
      return "Name already taken";
    } else {
      sessionStorage.setItem("name", JSON.stringify(name));
      nav("/play");
    }
  } catch (error) {
    console.error("Error :", error.message);
    return "Error while adding gamename";
  }
}

export async function getallMaps(setmaps) {
  try {
    const response = await fetch(`${BASE_URL}/location`);
    const maps = await response.json();
    setmaps(maps);
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function getMap(mapname) {
  try {
    const response = await fetch(`${BASE_URL}/location/${mapname}`);
    const maps = await response.json();
    return maps;
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function createGameMap(map, roundtime) {
  const roomid = generateRoomId();
  const gamemapobj = {
    room: roomid,
    roundtime: roundtime,
    mapname: map,
  };
  try {
    const response = await fetch(`${BASE_URL}/location/gamemap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gamemapobj),
    });

    sessionStorage.setItem("room", JSON.stringify(roomid));
    return roomid;
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function createMap(mapname, maps) {
  const mapsobj = {
    mapname: mapname,
    location: maps,
  };
  try {
    const response = await fetch(`${BASE_URL}/location/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mapsobj),
    });

    if (!response.ok) {
      return "Map name already taken";
    }
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function joinroom(room) {
  const name = sessionStorage.getItem("name");
  const joinobj = {
    name: name,
    room: room,
  };
  try {
    const response = await fetch(`${BASE_URL}/user/joinroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinobj),
    });
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function getlistofusersinroom(room, setplayers) {
  try {
    const response = await fetch(
      `${BASE_URL}/user/getlistofusersinroom/${room}`
    );
    const users = await response.json();
    setplayers(users);
  } catch (error) {
    console.error("Error :", error.message);
  }
}
