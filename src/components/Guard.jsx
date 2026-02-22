// React
import { useContext } from "react";
import { Navigate } from "react-router-dom";
// Context
import { authContext } from "../context/Authentication";

export default function Guard({ children }) {
  const { token } = useContext(authContext);
  return !token ? <Navigate to="/login" /> : children;
}
