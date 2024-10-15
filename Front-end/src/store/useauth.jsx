import { useContext } from "react";
import { AuthContext } from "./authContext";

// Create AuthContext

// Hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
