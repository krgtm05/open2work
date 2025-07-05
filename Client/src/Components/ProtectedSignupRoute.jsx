import { Navigate } from "react-router-dom";

export default function ProtectedSignupRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    // Role not selected → redirect to role selection page
    return <Navigate to='/' replace />;
  }

  return children;
}
