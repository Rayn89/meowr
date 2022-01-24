import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditImageForm from "../EditImageForm/EditImageForm";
import "./EditImageFormModal.css";

function EditImageFormModal({image}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Edit Image
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditImageForm image={image}/>
        </Modal>
      )}
    </>
  );
}

export default EditImageFormModal;
