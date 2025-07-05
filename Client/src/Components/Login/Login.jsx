import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleOnLoginSubmit() {
    try {
      const res = await axios.post("/api/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/feed");
    } catch{
      alert("User Not Found");
      //   console.error("Login failed", error);
    }
  }
  return (
    <>
      <h3>Login Page</h3>
      <input
        type='text'
        placeholder='enter your email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type='text'
        placeholder='enter your password'
        name='email'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleOnLoginSubmit} type='button'>
        Login
      </button>
    </>
  );
}
