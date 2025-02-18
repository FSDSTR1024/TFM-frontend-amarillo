import like from "../../assets/icons/like.svg";
import comment from "../../assets/icons/comentario-alt.svg";
import reWhizz from "../../assets/icons/retuit-de-flechas.svg";
import send from "../../assets/icons/send.svg";
import "./WhizzesCard.css";
import { useState } from "react";

export const WhizzesCard = ({ whizz }) => {
  const [likes, setLikes] = useState(whizz.likescount || 0);
  const [liked, setLiked] = useState(whizz.likedBy.includes(localStorage.getItem('userId')));

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

      const data = await response.json();

      if (liked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }

      setLiked(!liked);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

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
        <img className="like" src={like} alt="like" onClick={handleLike} />
          <p>{likes}</p>
        <img src={comment} alt="comment" />
        <img className="re-whizz" src={reWhizz} alt="reWhizz" />
        <img src={send} alt="send" />
      </div>
    </div>
  );
};
