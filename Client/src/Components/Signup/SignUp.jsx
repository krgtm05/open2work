import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleOnSignupSubmit() {
    try {
      const res = await axios.post("/api/signup", {
        email: email,
        password: password,
        role: localStorage.getItem("role"),
      });
      console.log(res.data);
      // On success, navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  }
  return (
    <>
    <h3>Signup Page</h3>
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
      <button onClick={handleOnSignupSubmit} type='button'>
        Submit
      </button>
    </>
  );
}
