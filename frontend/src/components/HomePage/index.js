import { Redirect } from "react-router-dom";
import './HomePage.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomePage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/images" />;

  return (
    <div className="homepage-container">
      <div className="homepage-writing">
        <h2 className="homepage-header">
          Find your inspiration right <span className="meow"> meow.</span>
        </h2>
        <h3 className="homepage-info">Join the Meowr community,</h3>
        <h2 className="homepage-info-small">
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