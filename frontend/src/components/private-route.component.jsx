import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus.js";

import SpinnerComponent from "./spinner.component.jsx";

export default function PrivateRouteComponent() {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) return <SpinnerComponent />;

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
