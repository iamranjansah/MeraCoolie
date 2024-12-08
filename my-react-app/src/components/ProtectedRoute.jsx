import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "../index.css"; // Add your CSS styles here

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to finish loading
  if (!isLoaded) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Redirect to login page if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  // Render children if the user is signed in
  return children;
};

export default ProtectedRoute;
