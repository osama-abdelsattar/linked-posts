// React
import { createContext, useContext, useState } from "react";
// Context
import { authContext } from "./Authentication";
// API & Caching
import axios from "axios";
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
    isFetching: userDataFetching,
    refetch,
  } = useQuery({
    queryKey: ["MyData"],
    queryFn: () =>
      axios.get("https://route-posts.routemisr.com/users/profile-data", {
        headers: {
          token: token,
        },
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: userDataFetchEnabled,
  });
  return (
    <profileContext.Provider
      value={{ userData, userDataLoading, refetch, setUserDataFetchEnabled }}
    >
      {userDataFetching && <ReloadSpinner />}
      {children}
    </profileContext.Provider>
  );
}
