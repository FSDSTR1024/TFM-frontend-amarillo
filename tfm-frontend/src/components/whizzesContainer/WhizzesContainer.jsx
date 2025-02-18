import { useEffect, useState } from "react";
import { WhizzesCard } from "../whizzesCard/WhizzesCard";
import "./WhizzesContainer.css";

const WhizzesContainer = () => {
  const [whizzes, setWhizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/whizzes")
      .then((response) => response.json())
      .then((data) => {
        setWhizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar whizzes", error);
        setLoading(false);
      });
  }, []);

  const updateWhizz = (updatedWhizz) => {
    setWhizzes((prevWhizzes) =>
      prevWhizzes.map((w) => (w._id === updatedWhizz._id ? updatedWhizz : w))
    );
  };

  return (
    <div className="whizzes-container">
      {loading ? (
        <p>Cargando whizzes...</p>
      ) : (
        whizzes.map((whizz) => <WhizzesCard key={whizz._id} whizz={whizz} updateWhizz={updateWhizz} />)
      )}
    </div>
  );
};

export default WhizzesContainer;