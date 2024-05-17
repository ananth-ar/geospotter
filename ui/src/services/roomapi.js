import { BASE_URL } from "./url";


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

export async function makeuserready() {
  const name = sessionStorage.getItem("name");
  const nameobj = {
    name: name,
  };
  try {
    const response = await fetch(`${BASE_URL}/user/makeready`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nameobj),
    });
  } catch (error) {
    console.error("Error :", error.message);
  }
}

export async function getgamemap() {
  const room = 679795;
  try {
    const response = await fetch(`${BASE_URL}/location/gamemap/${room}`);
    const map = await response.json();
    console.log(map);
  } catch (error) {
    console.error("Error :", error.message);
  }
}
