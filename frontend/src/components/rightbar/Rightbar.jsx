import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl"
import { Users } from "../../dummyData";
import "./rightbar.css";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    if (user) {
      const fetchFriends = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_HOST}api/users/${user._id}/friends`);
          setUserFriends(response.data.friends);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchFriends();
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.patch(`${process.env.REACT_APP_API_HOST}api/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else {
        await axios.patch(`${process.env.REACT_APP_API_HOST}api/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({type: "FOLLOW", payload: user._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {(currentUser._id !== user._id) && (
          <button className="rightbarFollowBtn" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"} &nbsp;
            {followed ? <SlUserUnfollow /> : <SlUserFollow />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Maried"
                  : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {userFriends && userFriends.map(friend => {
            return (
              <Link key={friend._id} style={{ textDecoration: "none", color: "gray" }} to={`/profile/${friend._id}`}>
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImg"
                    src={PF + (friend.profilePicture || 'person/defaultAvatar.png')}
                    alt=""
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
