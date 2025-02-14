import "./SearchBar.css";
import lupa from "../../assets/icons/lupa.svg";
import { useEffect, useState } from "react";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/search?q=${searchTerm}`
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error al buscar usuarios", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(value);
  };

  useEffect(() => {
    console.log("estado de results actualizado", results);
  }, [results]);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
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
              <li key={user.username}>
                {/*<img src={user.profilePicture} alt="avatar" />*/}
                {user.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/*let debounceTimer;
const debounce = (fn, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, delay);
};*/

export default SearchBar;
