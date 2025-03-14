import { useEffect, useState } from "react";
import perfil from "../../assets/icons/perfil.svg";
import logo from "../../assets/icons/whiz.svg";
import globo from "../../assets/icons/globos.svg";
import "./ProfileMenu.css";
import { WhizzesCard } from "../whizzesCard/WhizzesCard";
import { useNavigate } from "react-router";
import { Modal } from "../modal/Modal";

const ProfileMenu = () => {
  const userId = localStorage.getItem("userId");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userWhizzes, setUserWhizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getUserById = async () => {
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/users/${userId}`);
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    };
    getUserById();
  }, [backendUrl, userId]);

  useEffect(() => {
    fetch(`${backendUrl}/whizzes/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserWhizzes(data);
      })
      .catch((error) => {
        console.error("Error al cargar whizzes", error);
      });
  },);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }


  return (
    <>
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleLogout}
      title="Cerrar sesión"
      message="¿Seguro que quieres cerrar sesión?"
      confirmText="Cerrar sesión"
      cancelText="Cancelar"
/>

    <div className="profile-container">
      <div className="profile-banner">
        <img className="banner" src={logo} alt="logo" />
      </div>
      <img className="avatar" src={perfil} alt="avatar" />

      <div className="profile-details">
        <h2 className="profile-name">
          {userData.name} {userData.surname}
        </h2>
        <p className="profile-username">@{userData.username}</p>
        <p className="profile-location">{userData.location}</p>
        <p className="profile-birthdate"><img className="balloon" src={globo} alt="globo" /> {userData.birthdate}</p>
        <p className="profile-joined">
          {" "}
          Se unió en{" "}
          {new Date(userData.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="profile-stats">
        <span>
          <strong>{userData.followingCount}</strong> siguiendo
        </span>
        <span>
          <strong>{userData.followersCount}</strong> seguidores
        </span>
      </div>

      <button className="logout-btn" onClick={openModal}>Cerrar sesión</button>
    </div>
    <div className="profile-whizzes">
    {isLoading ? (
      <p>Cargando whizzes...</p>
    ) : (
      userWhizzes.map((whizz) => (
        <WhizzesCard key={whizz._id} whizz={whizz} />
      ))
    )}
  </div>
  </>
  );
};

export default ProfileMenu;
