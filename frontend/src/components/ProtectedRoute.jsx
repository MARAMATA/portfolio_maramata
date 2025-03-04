import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  // Si aucun token, rediriger vers la page de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si la route est réservée aux admins et que l'utilisateur n'est pas admin, rediriger vers le dashboard utilisateur
  if (requiredRole === "admin" && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

