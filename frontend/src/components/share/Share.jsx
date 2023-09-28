import { useContext, useRef, useState } from "react";
import { ImLocation, ImPriceTag, ImSmile2, ImImage } from "react-icons/im";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./share.css";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      author: user._id, 
      desc: desc.current.value,       
    };

    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name;
      formData.append('name', fileName); // File name must be passing before the file itself. Otherwise, it not works properly.
      formData.append('file', file);
      newPost.img = fileName;

      try {
        await axios.post(`${process.env.REACT_APP_API_HOST}/api/posts/uploadImage`, formData);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_HOST}/api/posts`, newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={submitHandler}>
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              process.env.REACT_APP_PUBLIC_FOLDER +
              (user.profilePicture || "/person/defaultAvatar.png")
            }
            alt=""
          />
          <input
            type="text"
            className="shareInput"
            placeholder={"What's in your mind " + user.username + "?"}
            required
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <ImImage color="tomato" className="shareOptionIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
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
          <button type="submit" className="shareButton">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}
