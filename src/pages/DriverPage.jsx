import { useEffect, useState } from "react";
import RideMap from "../components/RideMap";
import { listenToRide, updateRide, resetRide } from "../firebase/rideService";
import { saveRideHistory } from "../firebase/historyService";
import "../styles/DriverPage.css";

function DriverPage() {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToRide((data) => {
      setRide(data);
    });
    return () => unsubscribe();
  }, []);

  function handleAccept() {
    updateRide({
      ...ride,
      status: "accepted",
      driverLocation: { lat: 27.725, lng: 85.331 },
    });
  }

  function handleReject() {
    const finalRide = { ...ride, status: "rejected" };
    updateRide(finalRide);
    saveRideHistory(finalRide);
  }

  function handleStart() {
    updateRide({ ...ride, status: "active" });
  }

  function handleComplete() {
    const finalRide = { ...ride, status: "completed" };
    updateRide(finalRide);
    saveRideHistory(finalRide);
  }

  const markers = [];
  if (ride?.riderLocation) {
    markers.push({
      position: [ride.riderLocation.lat, ride.riderLocation.lng],
      label: "Pickup",
    });
  }
  if (ride?.dropLocation) {
    markers.push({
      position: [ride.dropLocation.lat, ride.dropLocation.lng],
      label: "Drop",
    });
  }
  if (ride?.driverLocation) {
    markers.push({
      position: [ride.driverLocation.lat, ride.driverLocation.lng],
      label: "You (Driver)",
    });
  }

  const isIdle = !ride || ride.status === "idle";

  return (
    <div className="driver-container">
      <h2 className="page-title">Driver</h2>

      <div className="status-bar">
        <span className="status-label">Status</span>
        <span className={`status-badge ${ride?.status || "idle"}`}>
          {ride?.status || "idle"}
        </span>
      </div>

      {isIdle && (
        <div className="idle-card">
          <p>Waiting for ride requests...</p>
        </div>
      )}

      {ride?.status === "requested" && (
        <div className="request-card">
          <p className="request-title">New Ride Request</p>
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
              <span>Fare</span>
              <span>Rs. {ride.price}</span>
            </div>
          </div>
          <div className="action-row">
            <button className="danger-btn" onClick={handleReject}>
              Reject
            </button>
            <button className="primary-btn" onClick={handleAccept}>
              Accept
            </button>
          </div>
        </div>
      )}

      {(ride?.status === "accepted" || ride?.status === "active") && (
        <div className="request-card">
          <p className="request-title">
            {ride.status === "accepted" ? "Ride Accepted" : "Ride In Progress"}
          </p>

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
              <span>Fare</span>
              <span>Rs. {ride.price}</span>
            </div>
          </div>

          <div className="action-row">
            {ride.status === "accepted" ? (
              <button className="primary-btn" onClick={handleStart}>
                Start Ride
              </button>
            ) : (
              <button className="primary-btn" onClick={handleComplete}>
                Complete Ride
              </button>
            )}
          </div>
        </div>
      )}

      {(ride?.status === "completed" || ride?.status === "rejected") && (
        <div className="request-card">
          {ride.status === "completed" ? (
            <p className="request-title">Ride Completed</p>
          ) : (
            <p className="request-title">Ride Rejected</p>
          )}
          <div className="action-row">
            <button className="primary-btn" onClick={resetRide}>
              Ready for Next Ride
            </button>
          </div>
        </div>
      )}

      {ride?.status === "cancelled" && (
        <div className="request-card">
          <p className="request-title">Rider Cancelled</p>
          <div className="action-row">
            <button className="primary-btn" onClick={resetRide}>
              Ready for Next Ride
            </button>
          </div>
        </div>
      )}

      {!isIdle && (
        <div className="map-wrapper">
          <RideMap markers={markers} />
        </div>
      )}
    </div>
  );
}

export default DriverPage;
