import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
ReactModal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, image }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
    </ReactModal>
  );
}
