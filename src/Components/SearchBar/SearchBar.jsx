import { useState, useEffect } from "react";
import Search from "../../assets/Search.png";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Llamar a la función de búsqueda cuando cambie la consulta de búsqueda
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    <div className="nav-bar">
      <img className="search" alt="Search" src={Search} />
      <div className="overlap-group">
        <input
          type="text"
          placeholder="Buscar personaje"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ fontFamily: "Simpsonfont" }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
