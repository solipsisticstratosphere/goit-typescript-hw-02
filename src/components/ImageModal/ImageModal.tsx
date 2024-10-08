import React from "react";
import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../images-api";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
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
};

export default ImageModal;
