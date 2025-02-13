import like from "../../assets/icons/like.svg";
import comment from "../../assets/icons/comentario-alt.svg";
import reWhizz from "../../assets/icons/retuit-de-flechas.svg";
import send from "../../assets/icons/send.svg";
import "./WhizzesCard.css";

export const WhizzesCard = ({ whizz }) => {
  return (
    <div className="whizz-card">
      <h4>@{whizz.userId}</h4>
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
        <img className="like" src={like} alt="like" />
        <img src={comment} alt="comment" />
        <img className="re-whizz" src={reWhizz} alt="reWhizz" />
        <img src={send} alt="send" />
      </div>
    </div>
  );
};
