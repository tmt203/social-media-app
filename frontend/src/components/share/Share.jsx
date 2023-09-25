import "./share.css";
import { ImLocation, ImPriceTag, ImSmile2, ImImage } from "react-icons/im"

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            type="text"
            className="shareInput"
            placeholder="What's in your mind Safak ?"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <ImImage color="tomato" className="shareOptionIcon" />
              <span className="shareOptionText">Photo/Video</span>
            </div>
            <div className="shareOption">
              <ImPriceTag color="blue" className="shareOptionIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <ImLocation color="green" className="shareOptionIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <ImSmile2 color="orange" className="shareOptionIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="button" className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
