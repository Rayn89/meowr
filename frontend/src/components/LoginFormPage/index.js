import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState([]);


    useEffect(() => {
      let newerrors = [];

      if (credential.length <= 0) {
        newerrors.push("Please enter a valid Username");
      }
      if (password.length < 6) {
        newerrors.push("Password must be at least 6 characters long");
      }
      setErrors(newerrors);
    }, [credential, password]);

  if (sessionUser) return <Redirect to="/images" />;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors([]);
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //     }
  //   );
  // };


        const handleSubmit = async (e) => {
          e.preventDefault();

          if (errors.length === 0) {
            const updated = await dispatch(
              sessionActions.login({
                credential,
                password,
              })
            ).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setDisplayErrors(data.errors);
            }
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
        <h2 className="login-header">Please Log-in</h2>
        <form onSubmit={handleSubmit} className="form-style">
          <div>
            {displayErrors.map((error, idx) => (
              <div className="error-list-login" key={idx}>{error}</div>
            ))}
          </div>
          <label className="form-labels">
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              // required
              className="form-input"
            />
          </label>
          <label className="form-labels">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              className="form-input"
            />
          </label>
          <button className="login-button" type="submit">
            Log In
          </button>
          <button
            className="login-button"
            onClick={() => {
              setCredential("Demo-lition");
              setPassword("password");
            }}
          >
            Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
