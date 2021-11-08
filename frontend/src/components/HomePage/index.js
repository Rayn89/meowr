// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import './HomePage.css'
import { NavLink } from 'react-router-dom'


function HomePage() {
  // const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;


  return (
    <div className="homepage-container">
      <div className="homepage-writing">
        <h2 className="homepage-header">
          Find your inspiration right <span className="meow">meow</span>.
        </h2>
        <h3 className="homepage-info">Join the Meowr community,</h3>
        <h2 className="homepage-info">
          home to tens of pictures and over 5 active users.
        </h2>
      </div>
      <NavLink to="/login" className="homepage-login">
        Log In
      </NavLink>
    </div>
  );
}

export default HomePage;