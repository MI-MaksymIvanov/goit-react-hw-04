import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ onClose, photo }) {
  const isOpen = Boolean(photo);

  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
    >
      {photo && (
        <>
          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            className={css.modalImage}
          />
        </>
      )}
    </Modal>
  );
}
