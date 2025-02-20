import { useState, useEffect } from "react";
import like from "../../assets/icons/like.svg";
import corazonLleno from "../../assets/icons/corazon lleno.svg";
import comment from "../../assets/icons/comentario-alt.svg";
import reWhizz from "../../assets/icons/retuit-de-flechas.svg";
import send from "../../assets/icons/send.svg";
import "./WhizzesCard.css";

export const WhizzesCard = ({ whizz, updateWhizz }) => {
  const userId = localStorage.getItem("userId"); // Obtener el ID del usuario logueado
  const [likesCount, setLikesCount] = useState(whizz.likesCount);
  const [liked, setLiked] = useState(whizz.likedBy.includes(userId));

  // Sincroniza el estado de "liked" cuando se actualiza el whizz
  useEffect(() => {
    setLiked(whizz.likedBy.includes(userId));
  }, [whizz, userId]);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/whizzes/${whizz._id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al dar like al whizz');
      }

      const updatedWhizz = await response.json();

      setLikesCount(updatedWhizz.likesCount);
      setLiked(updatedWhizz.likedBy.includes(userId));
      updateWhizz(updatedWhizz);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="whizz-card">
      <h4>@{whizz.user?.username}</h4>
      <p>{whizz.content}</p>

      {whizz.media && whizz.media.length > 0 && (
        <div className="whizz-card-media">
          {whizz.media.map((url, index) =>
            url.includes("image") ? (
              <img
                key={index}
                src={url}
                alt="whizzes media"
                className="whizz-image"
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

      <div className="whizz-card-icons">
        <img
          className="like"
          src={liked ? corazonLleno : like}
          alt="like"
          onClick={handleLike}
        />
        <p>{likesCount}</p>
        <img src={comment} alt="comment" />
        <img className="re-whizz" src={reWhizz} alt="reWhizz" />
        <img src={send} alt="send" />
      </div>
    </div>
  );
};