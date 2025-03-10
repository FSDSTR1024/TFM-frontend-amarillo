import { useEffect, useState } from "react";
import { WhizzesCard } from "../whizzesCard/WhizzesCard";
import { io } from "socket.io-client";
import "./WhizzesContainer.css";

const socketUrl = io(import.meta.env.VITE_SOCKET_URL);

const WhizzesContainer = () => {
  const [whizzes, setWhizzes] = useState([]);
  const [newWhizzes, setNewWhizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewWhizzesBtn, setShowNewWhizzesBtn] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/whizzes`)
      .then((response) => response.json())
      .then((data) => {
        setWhizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar whizzes", error);
        setLoading(false);
      });

    socketUrl.on("newWhizz", (newWhizz) => {
      setNewWhizzes((prevWhizzes) => [newWhizz, ...prevWhizzes]);
      setShowNewWhizzesBtn(true);
    });

    return () => {
      socketUrl.off("newWhizz");
    };
  }, []);

  /*const showNewWhizzes = () => {
    setWhizzes((prevWhizzes) => [...newWhizzes, ...prevWhizzes]);
    setNewWhizzes([]);
    setShowNewWhizzesBtn(false);
  };*/

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
      {loading ? (
        <p>Cargando whizzes...</p>
      ) : (
        whizzes.map((whizz) => (
          <WhizzesCard
            key={whizz._id}
            whizz={whizz}
            updateWhizz={updateWhizz}
          />
        ))
      )}
    </div>
  );
};

export default WhizzesContainer;
