import React from "react";
import { Navigate } from "react-router-dom";

interface IsLoggedInProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<IsLoggedInProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default IsLoggedIn;
