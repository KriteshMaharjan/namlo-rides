import { useEffect, useState } from "react";
import { fetchRideHistory } from "../firebase/historyService";
import "../styles/HistoryPage.css";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRideHistory()
      .then((data) => {
        setHistory(data.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="history-container">
      <h2 className="page-title">Ride History</h2>

      {loading && <div className="history-loading">Loading...</div>}

      {!loading && history.length === 0 && (
        <div className="history-empty">No rides yet.</div>
      )}

      {!loading &&
        history.map((ride) => (
          <div key={ride.id} className={`history-card ${ride.status}`}>
            <div className="history-card-top">
              <span className={`status-badge ${ride.status}`}>
                {ride.status}
              </span>
              <span className="history-time">
                {new Date(ride.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="history-card-body">
              <div className="history-row">
                <span>Vehicle</span>
                <span>{ride.vehicle || "—"}</span>
              </div>
              <div className="history-row">
                <span>Distance</span>
                <span>{ride.distance ? `${ride.distance} km` : "—"}</span>
              </div>
              <div className="history-row">
                <span>Fare</span>
                <span>{ride.price ? `Rs. ${ride.price}` : "—"}</span>
              </div>
              <div className="history-row">
                <span>Pickup</span>
                <span>
                  {ride.riderLocation
                    ? `${ride.riderLocation.lat.toFixed(4)}, ${ride.riderLocation.lng.toFixed(4)}`
                    : "—"}
                </span>
              </div>
              <div className="history-row">
                <span>Drop</span>
                <span>
                  {ride.dropLocation
                    ? `${ride.dropLocation.lat.toFixed(4)}, ${ride.dropLocation.lng.toFixed(4)}`
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default HistoryPage;
