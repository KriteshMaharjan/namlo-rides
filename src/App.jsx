import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RiderPage from "./pages/RiderPage";
import DriverPage from "./pages/DriverPage";
import HistoryPage from "./pages/HistoryPage";
import Navbar from "./components/NavBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("rider");

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  function handleLogout() {
    setLoggedIn(false);
    setRole("rider");
  }

  return (
    <div>
      <Navbar role={role} onSwitchRole={setRole} onLogout={handleLogout} />
      {role === "rider" && <RiderPage />}
      {role === "driver" && <DriverPage />}
      {role === "history" && <HistoryPage />}
    </div>
  );
}

export default App;
