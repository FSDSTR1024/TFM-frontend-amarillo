import { useEffect, useMemo, useState } from "react";
import perfil from "../../assets/icons/usuario-arriba.svg";
import logo from "../../assets/icons/whiz.svg";
import globo from "../../assets/icons/globos.svg";
import "./ProfileMenu.css";
import { WhizzesCard } from "../whizzesCard/WhizzesCard";
import { useNavigate } from "react-router";
import { Modal } from "../modal/Modal";
import { useParams } from "react-router";

const ProfileMenu = () => {
  const loggedUserId = localStorage.getItem("userId");
  const externalId = useParams();
  const userId = externalId.id || loggedUserId;
  const hasPermissions = externalId.id === loggedUserId; // Comprueba si el usuario logueado es el mismo que el del perfil
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userWhizzes, setUserWhizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const navigate = useNavigate();

  const openModal = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  // useEffect para obtener los datos del usuario según su id
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

  // useEffect para obtener los whizzes del usuario según su id
  useEffect(() => {
    fetch(`${backendUrl}/whizzes/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserWhizzes(data);
      })
      .catch((error) => {
        console.error("Error al cargar whizzes", error);
      });
  }, [backendUrl, userId]);

  //  useEffect para obtener la información del perfil del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error al cargar el perfil", error);
      }
    };
    fetchUserData();
  }, [userId, backendUrl, isChanged]);

  // useMemo para comprobar si el usuario logueado sigue al usuario del perfil consultado
  const isFollowing = useMemo(() => {
    return userData?.followers?.includes(loggedUserId);
  }, [userData, loggedUserId]);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  // Función para eliminar la cuenta mediante soft delete
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la cuenta. Intenta de nuevo.");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert("Error al eliminar la cuenta. Intenta de nuevo.");
    }
  };

  // Función para seguir o dejar de seguir a un usuario
  const handleFollowToggle = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}/follow`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${
            isFollowing ? "dejar de seguir" : "seguir"
          } al usuario. Intenta de nuevo.`
        );
      }

      setIsChanged((prev) => !prev);
    } catch (error) {
      console.error(
        `Error al ${isFollowing ? "dejar de seguir" : "seguir"} al usuario:`,
        error
      );
      alert(
        `Error al ${
          isFollowing ? "dejar de seguir" : "seguir"
        } al usuario. Intenta de nuevo.`
      );
    }
  };

  // Función para subir la imagen de perfil con cloudinary
  const ProfilePicUpload = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data.url) {
        const updateResponse = await fetch(
          `${backendUrl}/users/update-profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ [type]: data.url }),
          }
        );

        const updatedUser = await updateResponse.json();
        setUserData((prevUserData) => ({ ...prevUserData, ...updatedUser }));
      }
    } catch (error) {
      console.error("Error subiendo la imagen:", error);
      alert("Error subiendo al subir la imagen de perfil");
    }
  };

  return (
    <>
      {/* Modal y botones que cambian de manera dinámica según los permisos y estados de cada usuario */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={
          modalAction === "logout" ? handleLogout : handleDeleteAccount
        }
        title={modalAction === "logout" ? "Cerrar sesión" : "Eliminar cuenta"}
        message={
          modalAction === "logout"
            ? "¿Estas seguro que quieres cerrar sesion?"
            : "¿Estas seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        }
        confirmText={
          modalAction === "logout" ? "Cerrar sesión" : "Eliminar cuenta"
        }
        cancelText="Cancelar"
      />

      <div className="profile-container">
        <div className="profile-banner">
          <label>
            <img
              className="banner"
              src={userData.bannerImage || logo}
              alt="banner"
            />
            {hasPermissions && (
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  ProfilePicUpload(e.target.files[0], "bannerImage")
                }
              />
            )}
          </label>
        </div>
        <label className="profile-pic-container">
          <img
            className="profile-picture"
            src={userData.profilePicture || perfil}
            alt="picture"
          />
          {hasPermissions && (
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                ProfilePicUpload(e.target.files[0], "profilePicture")
              }
            />
          )}
        </label>
        <div className="profile-details">
          <h2 className="profile-name">
            {userData.name} {userData.surname}
          </h2>
          <p className="profile-username">@{userData.username}</p>
          <p className="profile-location">{userData.location}</p>
          <p className="profile-birthdate">
            <img className="balloon" src={globo} alt="globo" />{" "}
            {new Date(userData.birthdate).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="profile-joined">
            Se unió en{" "}
            {new Date(userData.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {hasPermissions && (
            <button
              className="delete-profile-btn"
              onClick={() => openModal("deleteAccount")}
            >
              Borrar Cuenta
            </button>
          )}
        </div>

        <div className="profile-stats">
          <span onClick={() => navigate(`/profile/${userData._id}/following`)}>
            <strong>{userData.followingCount}</strong> siguiendo
          </span>
          <span onClick={() => navigate(`/profile/${userData._id}/followers`)}>
            <strong>{userData.followersCount}</strong> seguidores
          </span>
        </div>

        {(hasPermissions && (
          <button className="logout-btn" onClick={() => openModal("logout")}>
            Cerrar sesión
          </button>
        )) || (
          <button className="follow-btn" onClick={handleFollowToggle}>
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </button>
        )}
      </div>
      <div className="profile-whizzes">
        {isLoading ? (
          <p>Cargando whizzes...</p>
        ) : userWhizzes.length > 0 ? (
          userWhizzes.map((whizz) => (
            <WhizzesCard key={whizz._id} whizz={whizz} />
          ))
        ) : (
          <div className="no-whizzes-container">
            <p>No hay whizzes para mostrar</p>
            <p>Cuando haya algo que mostrar aparecerá aqui</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMenu;
