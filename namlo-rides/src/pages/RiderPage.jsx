import { useEffect, useState } from "react";
import RideMap from "../components/RideMap";
import { listenToRide, updateRide, resetRide } from "../firebase/rideService";
import { saveRideHistory } from "../firebase/historyService";
import { getDistanceKm, calculatePrice, VEHICLES } from "../utils/pricing";
import "../styles/RiderPage.css";

function RiderPage() {
  const [ride, setRide] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToRide((data) => {
      setRide(data);
    });
    return () => unsubscribe();
  }, []);

  function handleMapClick(latlng) {
    if (ride?.status && ride.status !== "idle") return;
    if (!pickup) {
      setPickup(latlng);
    } else if (!drop) {
      setDrop(latlng);
    }
  }

  function handleReset() {
    setPickup(null);
    setDrop(null);
    setVehicle(null);
    resetRide();
  }

  const distance =
    pickup && drop
      ? getDistanceKm(pickup.lat, pickup.lng, drop.lat, drop.lng)
      : null;

  const price = vehicle && distance ? calculatePrice(vehicle, distance) : null;

  function handleRequest() {
    updateRide({
      status: "requested",
      riderLocation: { lat: pickup.lat, lng: pickup.lng },
      dropLocation: { lat: drop.lat, lng: drop.lng },
      vehicle,
      price,
      distance: Math.round(distance * 10) / 10,
      // eslint-disable-next-line react-hooks/purity
      createdAt: Date.now(),
    });
  }

  function handleCancel() {
    const finalRide = { ...ride, status: "cancelled" };
    updateRide(finalRide);
    saveRideHistory(finalRide);
  }

  const markers = [];
  if (pickup)
    markers.push({ position: [pickup.lat, pickup.lng], label: "Pickup" });
  if (drop) markers.push({ position: [drop.lat, drop.lng], label: "Drop" });
  if (ride?.driverLocation) {
    markers.push({
      position: [ride.driverLocation.lat, ride.driverLocation.lng],
      label: "Driver",
    });
  }

  const isBooked = ride?.status && ride.status !== "idle";

  return (
    <div className="rider-container">
      <h2 className="page-title">Rider</h2>

      {!isBooked && (
        <>
          <div className="map-instructions">
            {!pickup && (
              <p>
                Click on the map to set your <strong>pickup</strong> location
              </p>
            )}
            {pickup && !drop && (
              <p>
                Now click to set your <strong>drop</strong> location
              </p>
            )}
            {pickup && drop && <p>Select a vehicle below</p>}
          </div>

          <div className="map-wrapper">
            <RideMap markers={markers} onMapClick={handleMapClick} />
          </div>

          {pickup && drop && (
            <>
              <div className="trip-info">
                <div className="trip-info-row">
                  <span>Distance</span>
                  <span>{distance?.toFixed(2)} km</span>
                </div>
              </div>

              <div className="vehicle-cards">
                {VEHICLES.map((v) => (
                  <div
                    key={v.id}
                    className={`vehicle-card ${vehicle === v.id ? "selected" : ""}`}
                    onClick={() => setVehicle(v.id)}
                  >
                    <div className="vehicle-name">{v.name}</div>
                    <div className="vehicle-desc">{v.description}</div>
                    <div className="vehicle-price">
                      Rs. {calculatePrice(v.id, distance)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="action-row">
                <button className="secondary-btn" onClick={handleReset}>
                  Reset
                </button>
                <button
                  className="primary-btn"
                  onClick={handleRequest}
                  disabled={!vehicle}
                >
                  Request Ride
                </button>
              </div>
            </>
          )}
        </>
      )}

      {isBooked && (
        <>
          <div className="status-bar">
            <span className="status-label">Status</span>
            <span className={`status-badge ${ride.status}`}>{ride.status}</span>
          </div>
          <div className="trip-summary">
            <div className="trip-summary-row">
              <span>Vehicle</span>
              <span>{ride.vehicle}</span>
            </div>
            <div className="trip-summary-row">
              <span>Distance</span>
              <span>{ride.distance} km</span>
            </div>
            <div className="trip-summary-row">
              <span>Price</span>
              <span>Rs. {ride.price}</span>
            </div>
          </div>

          <div className="map-wrapper">
            <RideMap markers={markers} />
          </div>

          {(ride.status === "requested" || ride.status === "accepted") && (
            <div className="action-row">
              <button className="danger-btn" onClick={handleCancel}>
                Cancel Ride
              </button>
            </div>
          )}

          {ride.status === "completed" && (
            <div className="action-row">
              <button className="primary-btn" onClick={handleReset}>
                Book Another
              </button>
            </div>
          )}

          {(ride.status === "cancelled" || ride.status === "rejected") && (
            <div className="action-row">
              <button className="primary-btn" onClick={handleReset}>
                Try Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RiderPage;
