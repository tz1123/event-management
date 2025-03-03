// frontend/src/components/Navbar.js
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/events-logo.png";
import classes from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsGuest(decoded.guest || false); // Check if the token is a guest token
      } catch (error) {
        console.log(error);

        setIsGuest(false);
      }
    } else {
      setIsGuest(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={classes.mainHeader}>
      <Link to="/" className={classes.title}>
        <img src={logo} alt="Page logo" />
        <h1>EMW</h1>
      </Link>

      <nav>
        <ul className={classes.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            {token && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Dashboard
              </NavLink>
            )}
          </li>
          <li>
            {token && !isGuest && (
              <NavLink
                to="/create-event"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Create Event
              </NavLink>
            )}
          </li>
          <li>
            {token ? (
              <button onClick={handleLogout}>
                {isGuest ? "Exit Guest Mode" : "Logout"}
              </button>
            ) : (
              <div className={classes.auth}>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Register
                </NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
