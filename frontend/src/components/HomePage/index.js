import { Redirect } from "react-router-dom";
import './HomePage.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginFormModal from "../loginFormModal";
import SignupFormModal from "../signupFormModal"

function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/images" />;

  return (
    <div className="homepage-container">
      <div className="homepage-writing">
        <h1 className="homepage-header">
          Find your inspiration right <span className="meow"> meow.</span>
        </h1>
        <h2 className="homepage-info">Join the Meowr community!</h2>
        <h3 className="homepage-info">Home to tens of pictures</h3>
        <h3 className="homepage-info-small">and over 5 active users.</h3>
      </div>
      <li className="nav-bar-li loginbutton-home">
        <SignupFormModal />
      </li>
    </div>
  );
}

export default HomePage;