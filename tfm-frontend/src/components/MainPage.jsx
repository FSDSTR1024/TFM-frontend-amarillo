import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function MainPage() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token", error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Whiz!</h1>
      {username ? (
        <div>
          <h2>Bienvenido, {username}!</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <h2>Cargando...</h2>
      )}
    </div>
  );
}

export default MainPage;
