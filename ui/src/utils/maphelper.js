import { mapview, marker, streetView } from "../services/map";

export async function selectplaceMap(currentmap, handleMapClick) {
  const MapProperties = {
    center: currentmap ? currentmap : { lat: 42.345573, lng: -71.098326 },
    mapId: "bd6a084bedeb455",
    zoom: 4,
    minZoom: 1,
    maxZoom: 19,
    mapTypeControl: false,
    streetViewControl: false,
    showRoadLabels: false,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        east: 170,
        west: -170,
      },
    },
  };

  const PanoProperties = {
    position: currentmap,
    pov: {
      heading: 10,
      pitch: 1,
    },
    addressControl: false,
    fullscreenControl: false,
  };

  const map = await mapview("map", MapProperties);
  const panorama = await streetView("pano", PanoProperties);

  map.addListener("click", handleMapClick);

  const MarkerProperties = {
    map: map,
    position: currentmap,
  };
  const { StreetViewCoverageLayer } = await google.maps.importLibrary(
    "streetView"
  );
  const coverage = new StreetViewCoverageLayer();
  coverage.setMap(map);
  await marker(MarkerProperties);
  map.setStreetView(panorama);
}

export async function guesspano(loca) {
  const PanoProperties = {
    position: loca,
    pov: {
      heading: 10,
      pitch: 1,
    },
    addressControl: false,
    fullscreenControl: false,
  };

  const map = await mapview("map");
  const panorama = await streetView("pano", PanoProperties);

  map.setStreetView(panorama);
}

export async function markguess(mark, setmarker) {
  const MapProperties = {
    zoom: 1,
    center: { lat: 42.345573, lng: -71.098326 },
    mapId: "53b764d0605d9a3e",
    disableDefaultUI: true,
    zoom: 5,
    minZoom: 1,
    maxZoom: 19,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        east: 170,
        west: -170,
      },
    },
  };

  const map = await mapview("map1", MapProperties);

  const MarkerProperties = {
    map: map,
    position: mark,
  };

  await marker(MarkerProperties);
  map.addListener("click", setmarker);
}

export async function resultmap(loca, urselection) {
  const MapProperties = {
    center: loca,
    mapId: "e82872e0833acada",
    disableDefaultUI: true,
    zoom: 3,
    minZoom: 2,
    maxZoom: 19,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        east: 170,
        west: -170,
      },
    },
  };

  const map = await mapview("map", MapProperties);

  const beachFlagImg = document.createElement("img");

  beachFlagImg.src =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const beachFlagMarkerView = {
    map,
    position: loca,
    content: beachFlagImg,
  };

  const yourselection = document.createElement("img");

  yourselection.src =
    "https://img.icons8.com/emoji/48/index-pointing-at-the-viewer-medium-light-skin-tone-emoji.png";

  const yourselectionMarkerView = {
    map,
    position: urselection,
    content: yourselection,
  };

  await marker(beachFlagMarkerView);
  await marker(yourselectionMarkerView);
}
