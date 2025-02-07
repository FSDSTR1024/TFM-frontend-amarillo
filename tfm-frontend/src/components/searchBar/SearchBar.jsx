import "./SearchBar.css";
import lupa from '../../assets/icons/lupa.svg'

const SearchBar = () => {

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <img src={lupa} alt="lupa" />
        <input type="text" placeholder="Buscar" />
      </div>
    </div>
  );
};

export default SearchBar;