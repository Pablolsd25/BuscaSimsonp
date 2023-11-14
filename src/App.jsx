import { useState, useEffect } from "react";
import { CardCharacter } from "./Components/CardCharacter/CardCharacter";
import SearchBar from "./Components/SearchBar/SearchBar";
import Pagination from "./Components/Pagination/Pagination";
import "./Components/Pagination/Pagination.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchData = (page, query) => {
    setIsLoading(true);

    const apiUrl = query
      ? `https://apisimpsons.fly.dev/api/personajes/find/${query}?limit=8&page=${page}`
      : `https://apisimpsons.fly.dev/api/personajes?limit=8&page=${page}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.docs && data.docs.length > 0) {
          const characterData = data.docs.map((character) => ({
            name: character.Nombre,
            image: character.Imagen,
          }));
          setCharacters(characterData);
          setTotalPages(data.totalPages);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud", error);
        setIsLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <h1>Cargando</h1>;
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="card-container">
        {characters.map((character, index) => (
          <CardCharacter
            key={index}
            name={character.name}
            image={character.image}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
