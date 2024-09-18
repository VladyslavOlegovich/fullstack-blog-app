import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  console.log(cat);
  useEffect(() => {
    const fetchData = async () => {
      setPosts([]);
      console.log("posts aside must update");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/category/${cat}`
        );
        console.log(res);
        setPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className="menu">
      <h2>Other posts you may like</h2>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <Link className="link" to={`/post/${post.id}`}>
            <img src={post.img} alt="img" />
            <h2>{post.title}</h2>
            <button>Read more</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
