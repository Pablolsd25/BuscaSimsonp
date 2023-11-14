import { useState } from "react";
import Search from "../../assets/Search.png";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const result = await onSearch(searchQuery);
        setSearchResult(result);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchResult(null);
      }
    }
  };

  return (
    <div className="nav-bar">
      <img className="search" alt="Search" src={Search} />
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

      {searchResult && (
        <div className="search-result">
          <p>{searchResult.name}</p>
          <img src={searchResult.image} alt={searchResult.name} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
