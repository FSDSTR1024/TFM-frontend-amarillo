import "./FollowersList.css";
import perfil from "../../assets/icons/usuario-arriba.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FollowersList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const loggedUserId = localStorage.getItem("userId");
  const externalId =  useParams()
  const userId = externalId.id || loggedUserId
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/${userId}/followers`);
        if (!response.ok) throw new Error("Error al obtener los seguidores");

        const data = await response.json();
        setFollowers(data.followers);
      } catch (error) {
        console.error("Error al obtener los seguidores:", error);
      }
    };

    getFollowers();
  }, [backendUrl, userId]);

  return (
    <div className="followers-list-container">
      <ul className="followers-list">
        {followers.map((user) => (
          <li key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
            <img className="follower-image" src={user.profilePicture || perfil} alt="Perfil" />
            @{user.username}
          </li>
        ))}
      </ul>
    </div>
  )
};



export default FollowersList;