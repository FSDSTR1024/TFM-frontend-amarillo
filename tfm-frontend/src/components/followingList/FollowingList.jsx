import "./FollowingList.css";
import perfil from "../../assets/icons/usuario-arriba.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FollowingList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loggedUserId = localStorage.getItem("userId");
  const externalId =  useParams()
  const userId = externalId.id || loggedUserId
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}/following`);
        if (!response.ok) throw new Error("Error al obtener los usuarios seguidos");

        const data = await response.json();
        setFollowing(data.following);
      } catch (error) {
        console.error("Error al obtener los usuarios seguidos:", error);
      }
    };

    getFollowing();
  }, [backendUrl, userId]);

  return (
    <div className="following-list-container">
      <ul className="following-list">
        {following.map((user) => (
          <li key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
            <img className="following-image" src={user.profilePicture ? user.profilePicture : perfil} alt="perfil" />
            <p className="following-name">@{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;