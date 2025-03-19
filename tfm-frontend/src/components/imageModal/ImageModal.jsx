import ReactDom from "react-dom";
import "./ImageModal.css";

const ImageModal = ({ imageUrl, onClose }) => {
  return ReactDom.createPortal(
    <div className="image-modal" onClick={onClose}>
      <div className="image-modal-content">
        <img src={imageUrl} alt="Preview" />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ImageModal;