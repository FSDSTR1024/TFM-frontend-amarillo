import { Link } from "react-router-dom";
import "./MenuBar.css";
import inicio from "../../assets/icons/home.svg";
import lupa from "../../assets/icons/lupa.svg";
import mensajes from "../../assets/icons/sobre.svg";
import notificaciones from "../../assets/icons/campana.svg";
import crear from "../../assets/icons/add.svg";

const MenuBar = () => {
  return (
    <div className="menu-bar-container">
      <nav className="menu-bar">
        <Link to="/main">
          <img src={inicio} />
        </Link>
        <Link to="/search">
          <img src={lupa} />
        </Link>
        <Link to="/whizzes" className="add">
          <img src={crear} />
        </Link>
        <Link to="/messages">
          <img src={mensajes} />
        </Link>
        <Link to="/notifications">
          <img src={notificaciones} />
        </Link>
      </nav>
    </div>
  );
};

export default MenuBar;
