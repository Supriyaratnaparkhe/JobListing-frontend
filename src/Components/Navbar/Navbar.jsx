import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const UserName = localStorage.getItem('UserName')+" ";
  const navigate1 = useNavigate();

  const navigateLogin = (e) => {
    e.preventDefault();
    navigate1("/login");
  };
  const navigateSignUp = (e) => {
    e.preventDefault();
    navigate1("/register");
  };
  const navigateLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("UserName");
    setIsLoggedIn(false);
  };
  return (
    <div>
      {isLoggedIn ? (
        <div className="navbar">
          <div className="jobfinder">Jobfinder</div>
          <div className="buts logout">
            <div onClick={navigateLogout}>Logout</div>
            <div>Hello {UserName.substring(0, UserName.indexOf(' '))}</div>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="jobfinder">Jobfinder</div>
          <div className="buts">
            <div className="log-but">
              <button onClick={navigateLogin}>Login</button>
            </div>
            <div className="sign-but">
              <button onClick={navigateSignUp}>Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
