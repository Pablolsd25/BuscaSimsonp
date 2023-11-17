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

  const fetchData = async (page, query = "") => {
    setIsLoading(true);

    try {
      const formattedQuery = query.toLowerCase();

      const apiUrl = formattedQuery
        ? `https://apisimpsons.fly.dev/api/personajes/find/${encodeURIComponent(
            formattedQuery
          )}?limit=8&page=${page}`
        : `https://apisimpsons.fly.dev/api/personajes?limit=8&page=${page}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      console.log("Data from API:", data);

      if (data && data.docs && data.docs.length > 0) {
        const characterData = data.docs.map((character) => ({
          id: character._id,
          name: character.Nombre,
          image: character.Imagen,
        }));
        setCharacters(characterData);
        setTotalPages(data.totalPages);
      } else {
        setCharacters([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (query) => {
    fetchData(1, query);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return <h1>Cargando</h1>;
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {characters.length > 0 ? (
        <>
          <div className="card-container">
            {characters.map((character) => (
              <CardCharacter
                key={character.id}
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
      ) : (
        <p>No se encontraron personajes.</p>
      )}
    </>
  );
}

export default App;
