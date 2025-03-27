import { useEffect, useState } from "react";
import { WhizzesCard } from "../whizzesCard/WhizzesCard";
import { io } from "socket.io-client";
import "./WhizzesContainer.css";

const socketUrl = io(import.meta.env.VITE_SOCKET_URL);

const WhizzesContainer = () => {
  const [whizzes, setWhizzes] = useState([]);
  const [newWhizzes, setNewWhizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewWhizzesBtn, setShowNewWhizzesBtn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // useEffect para obtener los whizzes y actualizar la lista de whizzes utilizando websockets
  useEffect(() => {
    fetch(`${backendUrl}/whizzes`)
      .then((response) => response.json())
      .then((data) => {
        setWhizzes(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar whizzes", error);
        setIsLoading(false);
      });

    socketUrl.on("newWhizz", (newWhizz) => {
      setNewWhizzes((prevWhizzes) => [newWhizz, ...prevWhizzes]);
      setShowNewWhizzesBtn(true);
    });

    return () => {
      socketUrl.off("newWhizz");
    };
  }, [backendUrl]);

  // Función para actualizar la información de un whizz
  const updateWhizz = (updatedWhizz) => {
    setWhizzes((prevWhizzes) =>
      prevWhizzes.map((w) => (w._id === updatedWhizz._id ? updatedWhizz : w))
    );
  };

  return (
    <div className="whizzes-container">
      {showNewWhizzesBtn && (
        <button
          className="new-whizzes-btn"
          onClick={() => window.location.reload()}
        >
          Mostrar {newWhizzes.length} nuevos whizzes
        </button>
      )}
      {isLoading ? (
        <p>Cargando whizzes...</p>
      ) : whizzes.length > 0 ? (
        whizzes.map((whizz) => (
          <WhizzesCard
            key={whizz._id}
            whizz={whizz}
            updateWhizz={updateWhizz}
          />
        ))
      ) : (
        <div className="no-whizzes-container">
          <p>No hay whizzes para mostrar</p>
          <p>Cuando crees nuevos whizzes aparecerán aqui</p>
        </div>
      )}
    </div>
  );
};

export default WhizzesContainer;
