import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts/profile/${userId}`)
      setPosts(response.data.posts);
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(p => <Post key={p._id} post={p} />)}
      </div>
    </div>
  )
}
