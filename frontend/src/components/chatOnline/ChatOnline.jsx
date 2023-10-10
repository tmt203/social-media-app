import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_HOST + `api/users/${currentId}/friends`
      );

      setFriends(response.data.friends);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_HOST +
          `api/conversations/find/${currentId}/${user._id}`
      );

      setCurrentChat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => {
        return (
          <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  process.env.REACT_APP_PUBLIC_FOLDER +
                  (o.profilePicture || "person/defaultAvatar.png")
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
        );
      })}
    </div>
  );
}
