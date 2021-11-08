import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


function Footer() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="footer-bar">
        <h2>Footer</h2>
    </div>
  );
}

export default Footer;
