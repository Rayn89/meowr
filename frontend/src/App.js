import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import FooterPage from "./components/FooterPage";
import ImagesPage from "./components/ImagesPage/ImagesPage"
import AddImageForm from './components/AddImagePage'
import ImageDetails from "./components/ImageDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/images">
            <ImagesPage />
          </Route>
          <Route path="/addimage">
            <AddImageForm />
          </Route>
          <Route path="/images/:id">
            <ImageDetails />
          </Route>
        </Switch>
      )}
      <FooterPage />
    </>
  );
}

export default App;
