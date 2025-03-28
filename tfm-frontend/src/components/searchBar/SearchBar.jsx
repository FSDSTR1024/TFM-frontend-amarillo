import "./SearchBar.css";
import lupa from "../../assets/icons/lupa.svg";
import atras from "../../assets/icons/angulo-izquierdo.svg";
import { useEffect, useState } from "react";
import perfil from "../../assets/icons/usuario-arriba.svg";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Función para obtener los usuarios según el término de búsqueda
  const fetchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/users/search?q=${searchTerm}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error al buscar usuarios", error);
    }
  };

  //Función para manejar la búsqueda de usuarios en tiempo real según el input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    return;
  };

  // useEffect para hacer la búsqueda solo después de que el usuario deje de escribir
  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchUsers(search);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);


  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <img src={atras} alt="atras" onClick={() => window.history.back()} />
        <img src={lupa} alt="lupa" />
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="search-results">
        {results.length > 0 && (
          <ul className="search-list">
            {results.map((user) => (
              <li
                key={user.username}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <img className="avatar" src={user.profilePicture || perfil} />@
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
