import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./feed.css";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = userId
        ? await axios.get(`${process.env.REACT_APP_API_HOST}api/posts/profile/${userId}`)
        : await axios.get(`${process.env.REACT_APP_API_HOST}api/posts/timeline/${user._id}`);

      setPosts(response.data.posts);
    };

    fetchPosts();
  }, [userId, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userId || user._id === userId) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
