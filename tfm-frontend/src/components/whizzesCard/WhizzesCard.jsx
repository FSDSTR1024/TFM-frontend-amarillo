import { useState, useEffect } from "react";
import like from "../../assets/icons/like.svg";
import corazonLleno from "../../assets/icons/corazon lleno.svg";
import comment from "../../assets/icons/comentario-alt.svg";
import reWhizz from "../../assets/icons/retuit-de-flechas.svg";
import deleteIcon from "../../assets/icons/rectangulo-xmark.svg";
import sendIcon from "../../assets/icons/send.svg";
import cancelIcon from "../../assets/icons/rectangulo-xmark.svg";
import "./WhizzesCard.css";
import { useNavigate } from "react-router";
import { Modal } from "../modal/Modal";
import ImageModal from "../imageModal/ImageModal";
import perfil from "../../assets/icons/usuario-arriba.svg";

export const WhizzesCard = ({ whizz, updateWhizz }) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [likesCount, setLikesCount] = useState(whizz.likesCount);
  const [liked, setLiked] = useState(whizz.likedBy.includes(userId));
  const rewhizzesCount = whizz.rewhizzesCount;
  const repliesCount = whizz.repliesCount;
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingWhizz, setIsDeletingWhizz] = useState(true);
  const [deletingReplyId, setIsDeletingReplyId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Funciones para abrir y cerrar el modal de eliminar whizzes o respuestas
  const openDeleteWhizzModal = () => {
    setIsDeletingWhizz(true);
    setIsModalOpen(true);
  };

  const openDeleteReplyModal = (replyId) => {
    return () => {
      setIsDeletingWhizz(false);
      setIsDeletingReplyId(replyId);
      setIsModalOpen(true);
    };
  };

  // useEffect para controlar si el usuario ha dado like a un whizz
  useEffect(() => {
    setLiked(whizz.likedBy.includes(userId));
  }, [whizz, userId]);

  // Función para dar o quitar like a un whizz e incrementar o decrementar el contador de likes
  const handleLike = async () => {
    try {
      const response = await fetch(`${backendUrl}/whizzes/${whizz._id}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al dar like al whizz");
      }

      const updatedWhizz = await response.json();

      setLikesCount(updatedWhizz.likesCount);
      setLiked(updatedWhizz.likedBy.includes(userId));
      updateWhizz(updatedWhizz);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para hacer un rewhizz
  const handleReWhizz = async () => {
    try {
      navigate("/whizzes", { state: { quotedWhizz: whizz } });
    } catch (error) {
      console.error(error);
      if (error.message === "Whizz original no encontrado") {
        alert("El whizz original no se encuentra");
      }
    }
  };

  // Función para eliminar un whizz o una respuesta
  const handleDelete = async () => {
    try {
      let url = isDeletingWhizz
        ? `${backendUrl}/whizzes/${whizz._id}`
        : `${backendUrl}/replies/${deletingReplyId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      setIsModalOpen(false);

      if (isDeletingWhizz) {
        window.location.reload();
      } else {
        setReplies(replies.filter((reply) => reply._id !== deletingReplyId));
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para mostrar el input para crear una respuesta
  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  // Función para crear una respuesta a un whizz
  const handleReply = async () => {
    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`${backendUrl}/replies/${whizz._id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!response.ok) {
        throw new Error("Error al responder al whizz");
      }

      const newReply = await response.json();

      setReplies([...replies, newReply]);
      setReplyContent(" ");
      setShowReplyInput(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener las respuestas de un whizz
  const getReplies = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/replies/${whizz._id}/replies`
      );

      if (!response.ok) {
        throw new Error("Error al obtener las respuestas");
      }

      const data = await response.json();
      setReplies(data.replies);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para mostrar o ocultar las respuestas de un whizz
  const handleShowReplies = () => {
    if (!showReplies) {
      getReplies();
    }
    setShowReplies(!showReplies);
  };

  // Función para hacer scroll hasta el whizz original a partir de un whizz citado
  const scrollToWhizz = () => {
    const quotedWhizz = whizz.inReWhizzTo._id;
    const quotedWhizzElement = document.getElementById(quotedWhizz);

    if (quotedWhizzElement) {
      quotedWhizzElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      alert("El whizz original no se encuentra");
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title={isDeletingWhizz ? "Eliminar Whizz" : "Eliminar Respuesta"}
        message={
          isDeletingWhizz
            ? "¿Estás seguro de eliminar este whizz? Esta acción no se puede deshacer"
            : "¿Estás seguro de eliminar esta respuesta? Esta acción no se puede deshacer"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <div id={whizz._id} className="whizz-card">
        <h4
          className="whizz-card-user"
          onClick={() => navigate(`/profile/${whizz.user._id}`)}
        >
          <img
            className="whizz-card-img"
            src={whizz.user?.profilePicture || perfil}
            alt=""
          ></img>
          @{whizz.user?.username}
        </h4>
        <p>{whizz.content}</p>

        {whizz.media && whizz.media.length > 0 && (
          <div className="whizz-card-media">
            {whizz.media.map((url, index) =>
              url.includes("image", "video") ? (
                <img
                  key={index}
                  src={url}
                  alt="whizzes media"
                  className="whizz-image"
                  onClick={() => setSelectedImage(url)}
                />
              ) : (
                <video
                  key={index}
                  src={url}
                  alt="whizzes media"
                  className="whizz-video"
                  controls
                />
              )
            )}
          </div>
        )}

        {whizz.inReWhizzTo && (
          <div className="quoted-whizz-container">
            <p
              className="quoted-user"
              onClick={() => navigate(`/profile/${whizz.inReWhizzTo.user._id}`)}
            >
              <img
                className="whizz-card-img"
                src={whizz.inReWhizzTo.user?.profilePicture || perfil}
                alt=""
              ></img>
              @{whizz.inReWhizzTo.user?.username}
            </p>
            <p className="quoted-content">{whizz.inReWhizzTo.content}</p>
            <div className="quoted-whizz-media">
              {whizz.inReWhizzTo.media.map((url, index) =>
                url.includes("image") ? (
                  <img
                    key={index}
                    src={url}
                    alt="whizzes media"
                    className="whizz-image"
                    onClick={scrollToWhizz}
                  />
                ) : (
                  <video
                    key={index}
                    src={url}
                    alt="whizzes media"
                    className="whizz-video"
                    controls
                  />
                )
              )}
            </div>
          </div>
        )}

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}

        <div className="whizz-card-icons">
          <div className="like-container">
            <img
              className="like"
              src={liked ? corazonLleno : like}
              alt="like"
              onClick={handleLike}
            />
            <p className="likes-count">{likesCount}</p>
          </div>
          <div className="comment-container">
            <img src={comment} alt="comment" onClick={toggleReplyInput} />
            <p className="comments-count">{repliesCount}</p>
          </div>

          <div className="re-whizz-container">
            <img
              className="re-whizz"
              src={reWhizz}
              alt="reWhizz"
              onClick={handleReWhizz}
            />
            <p className="rewhizzes-count">{rewhizzesCount}</p>
          </div>
          {whizz.user._id === userId && (
            <img
              className="delete-icon"
              src={deleteIcon}
              alt="delete"
              onClick={openDeleteWhizzModal}
            />
          )}
        </div>

        {showReplyInput && (
          <div className="reply-input-container">
            <img
              className="cancel-icon"
              src={cancelIcon}
              alt="cancel"
              onClick={toggleReplyInput}
            />
            <textarea
              type="text"
              placeholder="Escribe tu respuesta..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows="5"
              maxLength={335}
            />
            <img
              className="send-icon"
              src={sendIcon}
              alt="send"
              onClick={handleReply}
            />
          </div>
        )}

        {repliesCount > 0 && (
          <div className="show-whizz-replies">
            <p className="show-replies-btn" onClick={handleShowReplies}>
              {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
            </p>

            {showReplies && (
              <div className="replies-container">
                {replies.map((reply) => (
                  <div key={reply._id} className="reply">
                    <p>
                      <strong
                        className="reply-user"
                        onClick={() => navigate(`/profile/${reply.userId._id}`)}
                      >
                        <img
                          className="reply-user-icon"
                          src={reply.userId.profilePicture || perfil}
                        ></img>
                        @{reply.userId.username}
                      </strong>{" "}
                      {reply.content}
                    </p>
                    {reply.userId._id === userId && (
                      <p
                        className="delete-reply-icon"
                        onClick={openDeleteReplyModal(reply._id)}
                      >
                        Eliminar respuesta
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
