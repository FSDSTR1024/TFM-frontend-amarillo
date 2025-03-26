import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import image from "../../assets/icons/imagen.svg";
import video from "../../assets/icons/video camara.svg";
import crear from "../../assets/icons/derecho.svg";
import "./WhizzesForm.css";

const CreateWhizz = () => {
  const location = useLocation();
  const quotedWhizz = location.state?.quotedWhizz || null;
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const isReWhizz = !!quotedWhizz;
  const inReWhizzTo = quotedWhizz?._id || null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleImgClick = (target) => {
    document.querySelector("." + target).click();
  };

  // Función para subir imágenes y vídeos en un whizz utilizando cloudinary
  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data.url) {
        setMedia((prevMedia) => [...prevMedia, data.url]);
      }
    } catch (error) {
      console.error("Error subiendo el archivo:", error);
      alert("Error subiendo el archivo");
    }
  };

  // Función para enviar un whizz y navegar automáticamente al feed
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("El contenido del whizz no puede estar vacío");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${backendUrl}/whizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          media,
          isReWhizz,
          inReWhizzTo,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Whizz original no encontrado");
        }
        throw new Error("Error al crear el whizz");
      }

      setContent("");
      setMedia([]);
      navigate("/main");
    } catch (error) {
      console.error("Error al crear el whizz:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="whizz-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Que estás pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
        maxLength={335}
      />

      {/* Contenedor para diferenciar entre el whizz citado y el whizz a crear */}
      {quotedWhizz && (
        <div className="quoted-whizz-container">
          <p className="quoted-user">@{quotedWhizz.user.username}</p>
          <p className="quoted-content">{quotedWhizz.content}</p>
          <div className="quoted-media">
            {quotedWhizz.media.map((url, index) => (
              <img key={index} src={url} alt="upload" />
            ))}
          </div>
        </div>
      )}

      <div className="media-container">
        {media.map((url, index) => (
          <div key={index} className="media-preview">
            {url.includes("image") ? (
              <img src={url} alt="upload" />
            ) : (
              <video src={url} controls />
            )}
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <label className="image-button" htmlFor="image-input">
          <img src={image} onClick={() => handleImgClick("image-input")} />
          <input
            className="image-input"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>
        <label className="video-button" htmlFor="video-input">
          <img src={video} onClick={() => handleImgClick("video-input")} />
          <input
            className="video-input"
            type="file"
            accept="video/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          <img src={crear} className="crear" />
        </button>
      </div>
    </form>
  );
};

export default CreateWhizz;
