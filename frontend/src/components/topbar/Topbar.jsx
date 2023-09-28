import { useContext } from "react"
import { IoIosSearch, IoMdNotifications, IoIosChatbubbles, IoMdPerson } from "react-icons/io"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import "./topbar.css"

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="logo">Facebook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <IoIosSearch className="searchIcon" />
          <input placeholder="Search for friends, posts, or videos,..." className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IoMdPerson />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <IoIosChatbubbles />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <IoMdNotifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user._id}`}>
          <img src={process.env.REACT_APP_PUBLIC_FOLDER + (user.profilePicture || "person/defaultAvatar.png")} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
