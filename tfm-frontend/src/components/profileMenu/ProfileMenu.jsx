import { useEffect, useState } from "react";
import perfil from "../../assets/icons/perfil.svg";
import logo from "../../assets/icons/whiz.svg";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserById = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    };
    getUserById();
  }, [userId]);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  return (
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
        <p className="profile-birthdate">🎈{userData.birthdate}</p>
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

      <button className="edit-profile-btn">Editar perfil</button>
    </div>
  );
};

export default ProfileMenu;
