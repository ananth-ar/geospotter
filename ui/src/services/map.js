import { Loader } from "@googlemaps/js-api-loader";


export async function mapview(elmentid, locationproperties) {
  const loader = new Loader({
    apiKey: "AIzaSyDucWqo-yEz6IbRmaI-Dq_iRGyZk_Kjeno",
    version: "weekly",
  });
  await loader.load();

  const map = new google.maps.Map(
    document.getElementById(elmentid),
    locationproperties
  );
  return map;
}

export async function streetView(elmentid, locationproperties) {
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById(elmentid),
    locationproperties
  );
  return panorama;
}

export async function marker(markerproperties) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const marker = new AdvancedMarkerElement(markerproperties);
}
