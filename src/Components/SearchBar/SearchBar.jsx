import { useState } from "react";
import Search from "../../assets/Search.png";
import { CardCharacter } from "../CardCharacter/CardCharacter"; // Import the CardCharacter component
import "./SearchBar.css";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
        setSearchResults(data.result || []);
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
    setShowResults(true);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    }
  };

  return (
    <div className="nav-bar">
      <img className="search" alt="Buscar" src={Search} />
      <div className={`card-container ${showResults ? "" : "hidden"}`}>
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

export default SearchBar;
