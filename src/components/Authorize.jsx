// React
import { useContext } from "react";
import { Navigate } from "react-router-dom";
// Context
import { authContext } from "../context/Authentication";

export default function Authorize({ children }) {
  const { token } = useContext(authContext);
  return !token ? children : <Navigate to="/" />;
}
