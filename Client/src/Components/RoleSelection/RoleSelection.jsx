import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "4rem",
      }}
    >
      <button
        onClick={() => handleRoleSelect("employer")}
        style={{ padding: "1rem 2rem" }}
      >
        I am an Employer
      </button>
      <button
        onClick={() => handleRoleSelect("candidate")}
        style={{ padding: "1rem 2rem" }}
      >
        I am a Candidate
      </button>
      <button onClick={() => handleLogin()} style={{ padding: "1rem 2rem" }}>
        Login
      </button>
    </div>
  );
}
