import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
const Single = () => {
  const { currentUser } = useContext(AuthContext);

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPost(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  console.log(post.categoryID);
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="img" />
        <div className="user">
          <img
            src="https://images.fineartamerica.com/images-medium-large-5/randy-rhoads-front-row-photographs-.jpg"
            alt="img"
          />
          <div className="info">
            <span>{post?.User?.name}</span>
            <p>posted {moment(post.createDate).fromNow()}</p>
          </div>
          {currentUser?.user?.name === post?.User?.name && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="delete" />
            </div>
          )}
        </div>
        <h2>{post.title}</h2>
        {post.text}
      </div>
      <Menu cat={post.categoryID} />
    </div>
  );
};

export default Single;
