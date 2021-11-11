import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import "./FooterPage.css"


function Footer() {
//   const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="footer-bar">
      <div className="profile">
        <p className="name">Ray Nehring</p>
        <Link className="links"
          to={{
            pathname: "https://github.com/Rayn89",
          }}
          target="_blank"
        >
          GitHub
        </Link>
        <Link className="links"
          to={{
            pathname: "https://www.linkedin.com/in/raymond-nehring-553ba2206/",
          }}
          target="_blank"
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
}

export default Footer;
