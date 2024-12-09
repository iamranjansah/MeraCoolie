import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteCoolie = () => {
  const token = localStorage.getItem("coolieToken");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/coolie-login" />;
  }

  try {
    // Decode JWT token: Split, decode, and parse payload
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the payload part of the JWT

    console.log(decodedToken);

    // Check if the decoded token has the 'role' as 'coolie'
    if (decodedToken.role !== "coolie") {
      // If the role is not "coolie", redirect to home or another page
      return <Navigate to="/" />;
    }
  } catch (error) {
    // If there's an error decoding the token, redirect to login
    return <Navigate to="/coolie-login" />;
  }

  // If the token is valid and the user is a coolie, proceed to the protected content
  return <Outlet />;
};
