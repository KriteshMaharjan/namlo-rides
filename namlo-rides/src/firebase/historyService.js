const API_URL = "https://6a2ad906b687a7d5cbc49335.mockapi.io/rides";

export async function saveRideHistory(ride) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ride),
  });
  return response.json();
}

export async function fetchRideHistory() {
  const response = await fetch(API_URL);
  return response.json();
}
