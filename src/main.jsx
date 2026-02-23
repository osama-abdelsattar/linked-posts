// Styles (eagerly loaded so @apply classes resolve before lazy components render)
import "./index.css";
import "./layout/header/Header.css";
import "./components/home/Home.css";
import "./components/profile/Profile.css";
import "./components/signup/Signup.css";
// React
import { createRoot } from "react-dom/client";
// Components
import App from "./App.jsx";
// API & Caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "online",
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});
// Style
// Network
import { checkConnectivity } from "./hooks/useIsOnline";

checkConnectivity();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
);
