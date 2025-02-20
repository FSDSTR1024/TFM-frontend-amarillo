import { useState } from "react";
import "./ProfileMenu.css";

const ProfileMenu = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newUsername, setNewUsername] = useState(user.username);
  const [banner, setBanner] = useState(user.banner);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  if (!user) {
    return <p>Cargando...</p>;
  }
  const handleSave = async () => {
    const updatedUser = {
      name: newName,
      username: newUsername,
      banner,
      profilePic,
    };
    console.log(updatedUser);

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setEdit(false);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil ", error);
    }
  };

  return (
    <div className="profile-menu">
      <div className="profile-banner">
        {edit && (
          <input
            type="file"
            accept="image/*"
            className="edit-banner"
            onChange={(e) => setBanner(URL.createObjectURL(e.target.files[0]))}
          />
        )}
      </div>

      <div className="profile-info">
        <img src={profilePic} alt="profile-pic" className="profile-pic" />
        {edit && (
          <input
            type="file"
            accept="image/*"
            className="edit-profile-pic"
            onChange={(e) =>
              setProfilePic(URL.createObjectURL(e.target.files[0]))
            }
          />
        )}
      </div>

      <div className="user-info">
        {edit ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="edit-input"
            />
            <div>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="edit-input"
              />
              {newUsername.length > 0 && newUsername.length < 4 && (
                <p className="error-text">
                  El nombre de usuario debe tener al menos 4 caracteres
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
          </>
        )}
        <p className="createdAt">Se unió en {user.createdAt}</p>
      </div>
      <div className="follow-info">
        <span>
          {user.followingCount} <span className="follow-text">Seguiendo</span>
        </span>
        <span>
          {user.followersCount} <span className="follow-text">Seguidores</span>
        </span>
      </div>
      <button
        onClick={() => (edit ? handleSave() : setEdit(true))}
        className="edit-button"
      >
        {edit ? "Guardar" : "Editar perfil"}
      </button>
    </div>
  );
};

export default ProfileMenu;
