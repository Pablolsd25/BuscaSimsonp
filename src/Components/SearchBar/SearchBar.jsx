import { useState } from "react";
import PropTypes from "prop-types";
import Search from "../../assets/Search.png";
import { CardCharacter } from "../CardCharacter/CardCharacter";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiUrl = "https://apisimpsons.fly.dev/api/personajes";

  const fetchData = async () => {
    try {
      const searchUrl = searchQuery
        ? `${apiUrl}/find/${searchQuery}?limit=5&page=1`
        : `${apiUrl}?limit=5&page=1`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        setSearchResults(data.docs || []);
      } else {
        console.error(
          "Tipo de contenido inválido en la respuesta:",
          contentType
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        await fetchData();
        onSearch(searchQuery, searchResults);
        setSearchQuery(""); // Limpia la búsqueda después de obtener resultados
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    }
  };

  return (
    <div className="nav-bar">
      <img className="search" alt="Buscar" src={Search} />
      <div
        className={`card-container ${searchResults.length > 0 ? "" : "hidden"}`}
      >
        {searchResults.map((character) => (
          <CardCharacter
            key={character._id}
            name={character.Nombre}
            image={character.Imagen}
          />
        ))}
      </div>
      <div className="overlap-group">
        <input
          type="text"
          placeholder="Buscar personaje"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          style={{ fontFamily: "Simpsonfont" }}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
