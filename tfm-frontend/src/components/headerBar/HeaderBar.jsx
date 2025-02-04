import { Link } from 'react-router-dom'
import './HeaderBar.css'
import barra from '../../assets/icons/clasificacion-de-barras.svg'
import refrescar from '../../assets/icons/deshacer.svg'
import logowhite from '../../assets/icons/whiz.svg'
import perfil from '../../assets/icons/perfil.svg'



const HeaderBar = () => {
 

  return (
    <div className="header-bar-container">
      <nav className="header-bar">
        <img className="barra" src={barra} />
        <img className="refrescar" src={refrescar} />
        <img className="logo" src={logowhite} />
        <Link to="/profile"><img src={perfil} /></Link>

      </nav>
    </div>
  );
}

export default HeaderBar;