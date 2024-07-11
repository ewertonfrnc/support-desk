import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus.tsx";

import SpinnerComponent from "./spinner.component.tsx";

type Props = {};
export default function PrivateRouteComponent(props: Props) {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) return <SpinnerComponent />;

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
