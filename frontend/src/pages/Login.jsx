import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      // await axios.post("http://localhost:5000/api/users/login", inputs);
      navigate("/");
      // console.log(response.data.token);
      // localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.log("error", err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err.error}</p>}
        <span>
          Don`t have an account?{" "}
          <Link to="/register">
            <br />
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
