import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import barra from "../../assets/icons/clasificacion-de-barras.svg";
import refrescar from "../../assets/icons/deshacer.svg";
import logowhite from "../../assets/icons/whiz.svg";
import perfil from "../../assets/icons/perfil.svg";

const HeaderBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const isFeed = path === "/main";
  const isProfile = path === "/profile";
  const isSearch = path === "/search";
  const isMessages = path === "/messages";
  const isNotifications = path === "/notifications";
  const isSettings = path === "/settings";

  return (
    <div className="header-bar-container">
      <nav className="header-bar">
        <div className="left-icons">
          <button>
            <img src={barra} alt="barra" />
          </button>
          <button>
            <img src={refrescar} alt="refrescar" />{" "}
          </button>
        </div>
        <div className="title">
          {isFeed && <img className="logo" src={logowhite} alt="logo" />}
          {isProfile && <h1>Perfil</h1>}
          {isNotifications && <h1>Notificaciones</h1>}
          {isSearch && <h1>Buscar</h1>}
          {isMessages && <h1>Mensajes</h1>}
          {isSettings && <h1>Ajustes</h1>}
        </div>
        <Link to="/profile">
          <img className="perfil" src={perfil} alt="perfil" />
        </Link>
      </nav>
    </div>
  );
};

export default HeaderBar;
