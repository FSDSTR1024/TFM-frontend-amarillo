import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import image from '../../assets/icons/imagen.svg';
import video from '../../assets/icons/video camara.svg';
import crear from '../../assets/icons/derecho.svg'
import './WhizzesForm.css';

const CreateWhizz = () => {
  const location = useLocation();
  const quotedWhizz = location.state?.quotedWhizz || null;
  const [content, setContent] = useState(quotedWhizz ? `@${quotedWhizz.user.username}: ${quotedWhizz.content}` : "");
  const [media, setMedia] = useState([]);
  const [isReWhizz, setIsReWhizz] = useState(quotedWhizz ? true : false);
  const [inReWhizzTo, setInReWhizzTo] = useState(quotedWhizz ? quotedWhizz._id : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImgClick = (target) => {
    document.querySelector('.'+target).click();
  }

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:3000/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data.url) {
        setMedia((prevMedia) => [...prevMedia, data.url]);
      }
    } catch (error) {
      console.error('Error subiendo el archivo:', error);
      alert('Error subiendo el archivo');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert('El contenido del whizz no puede estar vacío');
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/whizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          media,
          isReWhizz,
          inReWhizzTo
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el whizz');
      }

      const data = await response.json();
      console.log("Whizz creado exitosamente:", data);
      setContent('');
      setMedia([]);
      navigate('/main');
    } catch (error) {
      console.error("Error al crear el whizz:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="whizz-form" onSubmit={handleSubmit}>
      <textarea placeholder='Que estás pensando?' value={content} onChange={(e) => setContent(e.target.value)} rows="5" maxLength={335} />

      {quotedWhizz && (
        <div className="quoted-whizz-container">
          <p className="quoted-user">🔁 @{quotedWhizz.user.username}</p>
          <p className="quoted-content">{quotedWhizz.content}</p>
        </div>
      )}

      <div className="media-container">
        {media.map((url, index) => (
          <div key={index} className="media-preview">
            {url.includes('image') ? <img src={url} alt="upload" /> : <video src={url} controls />}
          </div>
        ))}
      </div>
      <div className='buttons-container'>
        <label className='image-button' htmlFor='image-input'>
          <img src={image} onClick={()=> handleImgClick('image-input')} />
          <input className="image-input" type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files[0])} />
        </label>
        <label className='video-button' htmlFor="video-input">
          <img src={video} onClick={()=> handleImgClick('video-input')}/>
          <input className="video-input" type="file" accept="video/*" onChange={(e) => handleFileUpload(e.target.files[0])} />
        </label>
        <button type="submit" disabled={isSubmitting}>
        <img src={crear} className="crear"/>
        </button>
      </div>
    </form>
  );
};

export default CreateWhizz;