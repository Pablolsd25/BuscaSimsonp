import "../CardCharacter/CardCharacter.css";

// eslint-disable-next-line react/prop-types
export const CardCharacter = ({ name, image }) => {
  return (
    <div className="card-character">
      <div className="overlap-group">
        <div style={{ fontFamily: "Simpsonfont" }} className="text-wrapper">
          {name}
        </div>
      </div>
      {image ? (
        <img className="element-krusty-the" alt={name} src={image} />
      ) : (
        <p>No hay imagen disponible</p>
      )}
    </div>
  );
};
