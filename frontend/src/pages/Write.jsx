import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Write = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.user.id);
  const state = useLocation().state;
  const [text, setText] = useState(state?.text || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState("");
  console.log(JSON.stringify(currentUser, null, 2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cat);
    try {
      if (state) {
        await axios.put(
          `http://localhost:5000/api/posts/${state.id}`,
          {
            title: title,
            text: text,
            categoryID: cat,
            authorID: state.authorID,
          },
          {
            withCredentials: true,
          }
        );
        console.log("Post updated successfully!");
      } else {
        axios.post(`http://localhost:5000/api/posts/`, {
          title: title,
          text: text,
          categoryID: cat,
          // authorID: state.authorID,
          authorID: currentUser.user.id,
        });
        console.log("Post created successfully!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    console.log(text, title);
  };
  console.log(state);
  console.log(JSON.stringify(state, null, 2));

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={text}
            onChange={setText}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h2>Publish</h2>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={(e) => handleSubmit(e)}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h2>Category</h2>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="guitars"
              id="guitars"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Guitars</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
