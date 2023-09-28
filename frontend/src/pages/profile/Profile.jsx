import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const reqParams = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/users/${reqParams.id}`);
      setUser(response.data.data);
    };

    fetchUser();
  }, [reqParams.id]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF + (user.coverPicture || "/person/defaultBackground.jpg")}
                alt="background"
              />
              <img
                className="profileUserImg"
                src={PF + (user.profilePicture || "/person/defaultAvatar.png")}
                alt="avatar"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={user._id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
