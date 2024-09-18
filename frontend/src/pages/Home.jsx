import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  console.log(search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${search}`);
        setPosts(res.data);
        console.log(res);
        console.log(search);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="img" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
