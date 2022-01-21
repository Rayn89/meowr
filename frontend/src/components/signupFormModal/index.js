import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "../SignupFormPage";
// import "./LoginFormButton.css";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button-modal" onClick={() => setShowModal(true)}>
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
