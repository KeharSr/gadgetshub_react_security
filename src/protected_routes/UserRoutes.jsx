import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const UserRoutes = () => {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check user and ensure they are not an admin
  return user && !user.isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default UserRoutes;
