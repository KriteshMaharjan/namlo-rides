// Calculate distance between two points in km (Haversine formula)
export function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const VEHICLES = [
  {
    id: "bike",
    name: "Bike",
    description: "Quick and affordable",
    basePrice: 30,
    perKm: 15,
  },
  {
    id: "car",
    name: "Car",
    description: "Comfortable ride",
    basePrice: 80,
    perKm: 35,
  },
];

export function calculatePrice(vehicle, distanceKm) {
  const v = VEHICLES.find((v) => v.id === vehicle);
  if (!v) return 0;
  return Math.round(v.basePrice + v.perKm * distanceKm);
}
