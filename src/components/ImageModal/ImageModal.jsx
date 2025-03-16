import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, photo }) {
  if (!isOpen || !photo) return null;

  const { urls, alt_description } = photo;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.imageModalCloseBtn} onClick={onRequestClose}>
        &times;
      </button>
      <img
        src={urls.regular}
        alt={alt_description || "No description available"}
        className={css.modalImage}
      />
      <p className={css.description}>
        {alt_description || "No description available"}
      </p>
    </Modal>
  );
}
