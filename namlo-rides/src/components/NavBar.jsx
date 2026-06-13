import "../styles/NavBar.css";

function Navbar({ role, onSwitchRole, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Namlo Rides</div>
      <div className="navbar-links">
        <button
          className={`nav-btn ${role === "rider" ? "active" : ""}`}
          onClick={() => onSwitchRole("rider")}
        >
          Rider
        </button>
        <button
          className={`nav-btn ${role === "driver" ? "active" : ""}`}
          onClick={() => onSwitchRole("driver")}
        >
          Driver
        </button>
        <button
          className={`nav-btn ${role === "history" ? "active" : ""}`}
          onClick={() => onSwitchRole("history")}
        >
          History
        </button>
        <button className="nav-btn logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
