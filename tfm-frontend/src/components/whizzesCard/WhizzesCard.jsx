import { useState, useEffect } from "react";
import like from "../../assets/icons/like.svg";
import corazonLleno from "../../assets/icons/corazon lleno.svg";
import comment from "../../assets/icons/comentario-alt.svg";
import reWhizz from "../../assets/icons/retuit-de-flechas.svg";
import deleteIcon from "../../assets/icons/rectangulo-xmark.svg";
import "./WhizzesCard.css";
import { useNavigate } from "react-router";
import { Modal } from "../modal/Modal";
import ImageModal from "../imageModal/ImageModal";

export const WhizzesCard = ({ whizz, updateWhizz }) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [likesCount, setLikesCount] = useState(whizz.likesCount);
  const [liked, setLiked] = useState(whizz.likedBy.includes(userId));
  const [rewhizzesCount] = useState(whizz.rewhizzesCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLiked(whizz.likedBy.includes(userId));
  }, [whizz, userId]);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`${backendUrl}/whizzes/${whizz._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el whizz");
      }

      setIsModalOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToWhizz = () => {
    const quotedWhizz = whizz.inReWhizzTo._id;
    const quotedWhizzElement = document.getElementById(quotedWhizz);

    if (quotedWhizzElement) {
      quotedWhizzElement.scrollIntoView({ behavior: "smooth", block: "center" });
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
        title="Eliminar Whizz"
        message="¿Estás seguro de que quieres eliminar este whizz? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <div id={whizz._id} className="whizz-card">
        <h4>@{whizz.user?.username}</h4>
        <p>{whizz.content}</p>

        {whizz.inReWhizzTo && (
          <div className="quoted-whizz-container">
            <p className="quoted-user">@{whizz.inReWhizzTo.user?.username}</p>
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

        {selectedImage && (
          <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
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
            <img src={comment} alt="comment" />
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
              onClick={openModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
