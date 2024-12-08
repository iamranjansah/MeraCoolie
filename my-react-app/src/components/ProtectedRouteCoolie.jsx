import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteCoolie = () => {
  const token = localStorage.getItem("token"); // Assuming token is saved in localStorage

  if (!token) {
    // Redirect to login page if no token
    return <Navigate to="/login" />;
  }

  try {
    // Optionally, verify if the token belongs to a coolie (by decoding it, for example)
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
    if (decodedToken.role !== "coolie") {
      // If the user is not a coolie, redirect to a different page (e.g., home or login)
      return <Navigate to="/" />;
    }
  } catch (error) {
    // If token is invalid, redirect to login
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and authorized, render the child route (outlet)
  return <Outlet />;
};
