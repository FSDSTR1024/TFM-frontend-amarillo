import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import barra from "../../assets/icons/clasificacion-de-barras.svg";
import refrescar from "../../assets/icons/deshacer.svg";
import logowhite from "../../assets/Whiz[1].svg";
import perfil from "../../assets/icons/usuario-arriba.svg";
import { useEffect, useState } from "react";

const HeaderBar = () => {
  const userId = localStorage.getItem("userId");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const path = location.pathname;
  const isFeed = path === "/main";
  const [userData, setUserData] = useState({});

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
            <img src={barra} alt="barra" />
          </button>
          <button onClick={() => window.location.reload()}>
            <img src={refrescar} alt="refrescar" />
          </button>
        </div>
        <div className="title">
          {isFeed && <img className="logo" src={logowhite} alt="logo" />}
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
