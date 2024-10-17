import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

// eslint-disable-next-line react/prop-types
export default function LoginRoute({ children, backRoute = "/comunidad" }) {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate(backRoute);
    }
  }, [loading, user, navigate, backRoute]);
  return loading || user ? <Loading /> : <> {children} </>;
}
