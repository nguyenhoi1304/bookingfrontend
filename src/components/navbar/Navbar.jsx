import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigate();
  const userActive = localStorage.getItem("USER__ARRAY");

  const handleLogout = () => {
    // Click logout sẽ xóa đi tên đăng nhập từ localStorage
    localStorage.setItem("USER__ARRAY", "");
    navigation("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">Booking Website</span>
        </Link>
        <div className="navItems">
          {userActive ? (
            <>
              <Link to={`/transaction/${userActive}`}>
                <span
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "20px",
                  }}
                >
                  Transaction Your
                </span>
              </Link>
              <span>{userActive}</span>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
