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
  const externalId =  useParams()
  const userId = externalId.id || loggedUserId
  const hasPermissions = externalId.id === loggedUserId
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
  }, [backendUrl, userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar el perfil", error);
      }
    };
    fetchUserData();
  }, [userId, backendUrl, isChanged]);

const isFollowing = useMemo(() => {
  return userData?.followers?.includes(loggedUserId);
}, [userData, loggedUserId]);
console.log("isFollowing:", isFollowing);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

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
        throw new Error(`Error al ${isFollowing ? "dejar de seguir" : "seguir"} al usuario. Intenta de nuevo.`);
      }

      setIsChanged((prev) => !prev);
    } catch (error) {
      console.error(`Error al ${isFollowing ? "dejar de seguir" : "seguir"} al usuario:`, error);
      alert(`Error al ${isFollowing ? "dejar de seguir" : "seguir"} al usuario. Intenta de nuevo.`);
        }
  };

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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={modalAction === "logout" ? handleLogout : handleDeleteAccount}
        title={modalAction === "logout" ? "Cerrar sesión" : "Eliminar cuenta"}
        message={
          modalAction === "logout"
            ? "¿Estas seguro que quieres cerrar sesion?"
            : "¿Estas seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        }
        confirmText={modalAction === "logout" ? "Cerrar sesión" : "Eliminar cuenta"}
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
            {hasPermissions &&
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  ProfilePicUpload(e.target.files[0], "bannerImage")
                }
              />
            }
          </label>
        </div>
        <label className="profile-pic-container">
          <img
            className="profile-picture"
            src={userData.profilePicture || perfil}
            alt="picture"
          />
          {hasPermissions &&
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                ProfilePicUpload(e.target.files[0], "profilePicture")
              }
            />
          }
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
          {hasPermissions &&
            <button className="delete-profile-btn" onClick={() => openModal("deleteAccount")}>
              Borrar Cuenta
            </button>
          }
        </div>

        <div className="profile-stats">
          <span onClick={() => navigate(`/profile/${userData._id}/following`)}>
            <strong>{userData.followingCount}</strong> siguiendo
          </span>
          <span onClick={() => navigate(`/profile/${userData._id}/followers`)}>
            <strong>{userData.followersCount}</strong> seguidores
          </span>
        </div>

        {hasPermissions &&
          <button className="logout-btn" onClick={() => openModal("logout")}>
            Cerrar sesión
          </button>
          ||
          <button className="follow-btn" onClick={handleFollowToggle}>{isFollowing ? "Dejar de seguir" : "Seguir"}</button>
          }
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
