export function generateRoomId() {
  let result = "";
  const characters = "0123456789";

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export async function checkStreetView(clickedPoint, setcurrentmap) {
  const panoramaService = new google.maps.StreetViewService();
  const locationRequest = {
    location: new google.maps.LatLng(clickedPoint.lat, clickedPoint.lng),
  };

  try {
    const response = await panoramaService.getPanorama(locationRequest);
    console.log("Street View available!");
    console.log(response);
    setcurrentmap(clickedPoint);
  } catch (error) {
    console.error("Error:", error);
    return "Street View not available!";
  }
}

export function getfromSessionStorage(dataname, nav) {
  const name = JSON.parse(sessionStorage.getItem(dataname));
  if (!name) {
    alert("Set gamename ");
    return nav("/gamename");
  } else {
    return name;
  }
}

export function sessiongamedata(nav) {
  const name = getfromSessionStorage("name", nav);
  const roomid = JSON.parse(sessionStorage.getItem("room"));
  const maps = JSON.parse(sessionStorage.getItem("maps"));
  const index = JSON.parse(sessionStorage.getItem("index"));
  const streetviewloca = maps.location.location[index];

  return { name, roomid, maps, index, streetviewloca };
}
