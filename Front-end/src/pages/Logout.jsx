import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth"; // Custom hook to use the context


export const Logout = () => {
  const { LogoutUser } = useAuth();


  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login"/>
}
