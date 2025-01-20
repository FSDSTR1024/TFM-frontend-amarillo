import whizlogo from '../assets/Whiz[1].svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={whizlogo} className="logo" alt="Whiz logo" />
    </div>
  );
};

export default Logo;
