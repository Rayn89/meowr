import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="login-signup">
        <NavLink to="/login" className="nav-bar-li loginbutton">
          Log In
        </NavLink>
        <NavLink to="/signup" className="nav-bar-li signupbutton">
          Sign Up
        </NavLink>
      </div>
    );
  }

  return (
    <div className="nav-bar-container">
      <ul className="nav-bar-ul">
        <li className="nav-bar-li">
          <NavLink exact to="/" className="nav-bar-li homepage-button">
            Meowr
          </NavLink>
          <NavLink to="/images">
            Cats
          </NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
