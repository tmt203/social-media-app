import "./topbar.css"
import { IoIosSearch, IoMdNotifications, IoIosChatbubbles, IoMdPerson } from "react-icons/io"

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Facebook</span>
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
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  )
}
