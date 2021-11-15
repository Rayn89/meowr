import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import isEmail from "validator/lib/isURL";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState([]);
  // const [credential, setCredential] = useState('')

      useEffect(() => {
        let newerrors = [];
        
        if (!isEmail(email)) {
          newerrors.push("Please enter a valid Email");
        }
        if (username.length <= 0) {
          newerrors.push("Please enter a valid Username");
        }
        if(password.length < 6) {
          newerrors.push("Password must be at least 6 characters long")
        }
        setErrors(newerrors);
      }, [email, username, password]);

  if (sessionUser) return <Redirect to="/images" />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setErrors([]);
  //     return dispatch(
  //       sessionActions.signup({ email, username, password })
  //     ).catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     });
  //   }
  //   return setErrors([
  //     "Confirm Password field must be the same as the Password field",
  //   ]);
  // };


  
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (errors.length === 0 && password === confirmPassword) {
          const updated = await dispatch(
            sessionActions.signup({
              email,
              username,
              password,
            })
          );
          if (updated) {
            setDisplayErrors([]);
          }
        } else {
          setDisplayErrors(errors);
        }
      };

  return (
    <div className="loginform-container">
      <div className="inner-container">
        <h2 className="signup-header">Sign-up!</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <ul className="error-list">
            {displayErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="form-labels">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </label>
          <label className="form-labels">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // required
            />
          </label>
          <label className="form-labels">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <label className="form-labels">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
            />
          </label>
          <button type="submit" className="signup-button-main">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
