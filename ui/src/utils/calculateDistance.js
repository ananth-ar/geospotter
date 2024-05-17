export function calculateDistance(point1, point2) {
  if (!point2) {
    return null;
  }
  const R = 6371;
  const φ1 = toRadians(point1.lat);
  const φ2 = toRadians(point1.lat);
  const dLat = toRadians(point2.lat - point1.lat);
  const dLon = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
