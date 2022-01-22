import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../loginFormModal";
import SignupFormModal from "../signupFormModal"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);


  let content;
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
    content= <p className="user-name-name">{sessionUser.username}</p>
    
  } else {
    sessionLinks = (
      <div className="login-signup">
        <ul className="login-signup">
          <li className="nav-bar-li loginbutton">
            <LoginFormModal />
          </li>
          <li className="nav-bar-li loginbutton">
            <SignupFormModal />
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="nav-bar-container">
      <ul className="nav-bar-ul">
        <li className="nav-bar-li">
          <div className="meow-cats">
            <NavLink exact to="/" className="nav-bar-li homepage-button">
              Meowr
            </NavLink>
            <NavLink to="/images" className="cat-images-link">
              Cats
            </NavLink>
          </div>
          <div className="user-name">
            {content}
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
