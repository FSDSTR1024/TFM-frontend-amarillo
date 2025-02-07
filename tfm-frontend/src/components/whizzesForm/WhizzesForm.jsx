import { useState } from 'react';
import { useNavigate } from 'react-router';
import './WhizzesForm.css';

const CreateWhizz = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
        body: JSON.stringify({ content, media }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el whizz');
      }

      const data = await response.json();
      console.log("Whizz creado exitosamente:", data);
      alert('Whizz creado exitosamente');
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
      <textarea placeholder='Que estás pensando?' value={content} onChange={(e) => setContent(e.target.value)} rows="5" required maxLength={335}/>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando whizz...' : 'Crear Whizz'}
      </button>
    </form>
  );
};

export default CreateWhizz;