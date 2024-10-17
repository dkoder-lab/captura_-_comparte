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
      logout();
      navigate(backRoute);
    }
  }, [loading, user, navigate, backRoute]);
  return loading || !user ? <Loading /> : <> {children} </>;
}
