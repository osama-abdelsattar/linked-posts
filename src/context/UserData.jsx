// React
import { createContext, useContext, useState } from "react";
// Context
import { authContext } from "./Authentication";
// API & Caching
import api from "../api";
import { useQuery } from "@tanstack/react-query";
// Components
import ReloadSpinner from "../components/reload-spinner/ReloadSpinner";

export const profileContext = createContext();
export default function UserData({ children }) {
  const { token } = useContext(authContext);
  const [userDataFetchEnabled, setUserDataFetchEnabled] = useState(
    Boolean(token),
  );
  const {
    data: userData,
    isLoading: userDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyData"],
    queryFn: () =>
      api.get("/users/profile-data", {
        headers: {
          token: token,
        },
      }),
    select: (res) => res.data.data,
    enabled: userDataFetchEnabled,
  });
  return (
    <profileContext.Provider
      value={{ userData, userDataLoading, refetch, setUserDataFetchEnabled }}
    >
      {children}
    </profileContext.Provider>
  );
}
