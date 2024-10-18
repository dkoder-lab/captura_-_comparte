import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children, backRoute = "/" }) {
  const navigate = useNavigate();
  const { loading, user, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const validation = location.href.split("/comunidad/");
      if (location.href.includes("comunidad") && validation[1]) {
        localStorage.setItem("share_href", "/comunidad/" + validation[1]);
      }
      logout();
      navigate(backRoute);
    }
  }, [loading, user, navigate, backRoute]);
  return loading || !user ? <Loading /> : <> {children} </>;
}
