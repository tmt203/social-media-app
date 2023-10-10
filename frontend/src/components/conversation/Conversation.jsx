import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation
      .members
      .find(userId => userId !== currentUser._id);

    const getUser = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "api/users/" + friendId);

        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture ? user.profilePicture : 'person/defaultAvatar.png' )}
        alt=""
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}
