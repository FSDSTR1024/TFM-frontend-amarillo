import { Link, useNavigate } from 'react-router-dom'
import './MenuBar.css'
import inicio from '../../assets/icons/home.svg'
import lupa from '../../assets/icons/lupa.svg'
import mensajes from '../../assets/icons/sobre.svg'
import notificaciones from '../../assets/icons/campana.svg'
import ajustes from '../../assets/icons/operacion.svg'

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-bar-container">
      <nav className="menu-bar">
        <Link to="/main"><img src={inicio} /></Link>
        <Link to="/search"><img src={lupa} /></Link>
        <Link to="/messages"><img src={mensajes} /></Link>
        <Link to="/notifications"><img src={notificaciones} /></Link>
        <Link to="/settings"><img src={ajustes} /></Link>
      </nav>
    </div>
  );
}

export default MenuBar;