import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    await axios
      .post("https://booking-backend-s33n.onrender.com/api/auth/register", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.user);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="lInput"
        />
        <input
          type="text"
          value={email}
          placeholder="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
