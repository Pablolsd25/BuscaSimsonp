// SearchBar.jsx
import Search from "../../assets/Search.png";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="nav-bar">
      <img className="search" alt="Search" src={Search} />
      <div className="overlap-group">
        <p className="text-wrapper">Buscar personaje</p>
      </div>
    </div>
  );
};

export default SearchBar;
