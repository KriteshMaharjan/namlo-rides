import { db } from "./firebase";
import { ref, set, onValue, off } from "firebase/database";

const rideRef = ref(db, "activeRide");

export function updateRide(data) {
  return set(rideRef, data);
}

export function listenToRide(callback) {
  onValue(rideRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  return () => off(rideRef);
}

export function resetRide() {
  return set(rideRef, { status: "idle" });
}
