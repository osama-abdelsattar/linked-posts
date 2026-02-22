// React
import { createContext, useState } from "react";

export const authContext = createContext();
export default function Authentication({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
