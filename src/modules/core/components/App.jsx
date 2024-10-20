import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Auth from "../../auth/components";
import Comunity from "../../comunity/components";
import Profile from "../../profile/components";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import PersonalPost from "../../comunity/components/PersonalPost";

import 'react-toastify/dist/ReactToastify.css';
import "../styles/index.css";
import "../../../assets/fonts/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginRoute>
        <Auth />
      </LoginRoute>
    ),
  },
  {
    path: "/comunidad",
    element: (
      <ProtectedRoute>
        <Comunity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/comunidad/:postId",
    element: (
      <ProtectedRoute>
        <PersonalPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mis_aventuras",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}
