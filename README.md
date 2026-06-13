# Namlo Rides — Real-Time Ride-Sharing Simulator

A frontend engineering challenge submission for Namlo Technologies Pvt. Ltd.

Live Demo: https://namlo-rides-three.vercel.app/

---

## Test Credentials

Email: intern@namlotech.com
Password: namlo2026

---

## How to Run Locally

### Prerequisites

- Node.js v18 or above
- npm

### Steps

```bash
# Clone the repository
git clone https://github.com/KriteshMaharjan/namlo-rides

# Navigate into the project
cd namlo-rides

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## How to Test the Simulation

1. Open two browser windows side by side
2. Log in with the test credentials in both
3. Select **Rider** in one window and **Driver** in the other
4. In the Rider window:
   - Click the map to set a pickup location
   - Click again to set a drop location
   - Select a vehicle (Bike or Car)
   - Click **Request Ride**
5. In the Driver window:
   - The request appears instantly
   - Accept or reject the ride
   - If accepted, start and then complete the ride
6. Check the **History** tab to see completed rides

---

## Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | React, Vite                  |
| Styling        | Plain CSS with CSS variables |
| Map            | React-Leaflet, OpenStreetMap |
| Real-time sync | Firebase Realtime Database   |
| Ride history   | MockAPI.io (REST)            |
| Deployment     | Vercel                       |

---

## Architecture

### Hybrid Data Model

The app uses two separate data layers with distinct responsibilities:

**Firebase Realtime Database** handles all live, transient ride state — status updates, location data, and trip details. Any change written by one client is instantly reflected in all connected clients via Firebase's WebSocket layer.

**MockAPI.io** handles persistent ride history. When a ride reaches a terminal state (completed, cancelled, or rejected), the app fires a POST request to MockAPI to archive the record. The History page fetches this log via a standard GET request.

### Ride State Machine

Each state transition is a single `set()` call to Firebase. Terminal states also trigger a REST POST to MockAPI.

### Pricing

Fare is calculated on the client using the Haversine formula to compute distance between pickup and drop coordinates. Each vehicle type has a base fare and a per-km rate:

- **Bike** — Rs. 30 base + Rs. 15/km
- **Car** — Rs. 80 base + Rs. 35/km

### Memory Management

All Firebase listeners use `onValue` and are unsubscribed via the cleanup function returned from `useEffect`. This prevents memory leaks when components unmount or the user switches roles.

---

## Known Limitations

- Driver location is currently hardcoded. In a production system this would use the Geolocation API.
- Pickup and drop coordinates are map-click based, not address-search based.
- Single active ride at a time by design — this matches the simulation scope.

---

## Author

Kritesh Maharjan  
GitHub: https://github.com/KriteshMaharjan
Portfolio: https://portfolio-ecru-nine-zi4iacy1xk.vercel.app/
