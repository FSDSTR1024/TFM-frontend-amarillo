import "./Modal.css";

// Modal dinámico para eliminar cuenta, eliminar whizzes, eliminar comentarios y cerrar sesión.
export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-btns">
          <button onClick={onConfirm} className="confirm-btn">
            {confirmText}
          </button>
          <button onClick={onClose} className="cancel-btn">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
