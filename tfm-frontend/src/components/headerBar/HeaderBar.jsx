import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import atras from "../../assets/icons/angulo-izquierdo.svg";
import refrescar from "../../assets/icons/deshacer.svg";
import logowhite from "../../assets/Whiz[1].svg";
import perfil from "../../assets/icons/usuario-arriba.svg";
import { useEffect, useState } from "react";

const HeaderBar = () => {
  const loggedUserId = localStorage.getItem("userId");
  const externalId = useParams();
  const userId = externalId.id || loggedUserId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const path = location.pathname;
  const isFeed = path === "/main";
  const isMessages = path === "/messages";
  const isNotifications = path === "/notifications";
  const isFollowers = path === `/profile/${userId}/followers`;
  const isFollowing = path === `/profile/${userId}/following`;
  const [userData, setUserData] = useState({});

  // useEffect para obtener los datos del usuario según su id
  useEffect(() => {
    const getUserById = async () => {
      const response = await fetch(`${backendUrl}/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    };
    getUserById();
  }, [backendUrl, userId]);

  return (
    <div className="header-bar-container">
      <nav className="header-bar">
        <div className="left-icons">
          <button>
            <img
              src={atras}
              alt="atras"
              onClick={() => window.history.back()}
            />
          </button>
          <button onClick={() => window.location.reload()}>
            <img src={refrescar} alt="refrescar" />
          </button>
        </div>

        {/* Título dinámico de la página que cambia según el useLocation */}
        <div className="title">
          {isFeed && <img className="logo" src={logowhite} alt="logo" />}
          {isNotifications && <h1>Notificaciones</h1>}
          {isMessages && <h1>Mensajes</h1>}
          {isFollowers && <h1>Seguidores</h1>}
          {isFollowing && <h1>Seguidos</h1>}
        </div>
        <Link to={`/profile/${userId}`}>
          <img
            className="perfil"
            src={userData.profilePicture || perfil}
            alt="perfil"
          />
        </Link>
      </nav>
    </div>
  );
};

export default HeaderBar;
