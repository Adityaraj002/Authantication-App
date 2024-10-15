import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./authContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(null); // Ensure the user is initially null

  // Store token in local storage and refetch user data when the token is updated
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken); // Update token state
    localStorage.setItem("accessToken", serverToken);
  };

  let isLoggedIn = !!token;

  // Handle logout
  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("accessToken");
    setUser(null); // Clear user state when logged out
  };

  // JWT Authentication - to get currently logged in data
  const userAuthentication = useCallback(async () => {
    if (!token) return; // Don't attempt to fetch if no token

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userdata = await response.json();
        // console.log("user data is ", userdata.data);
        setUser(userdata.data); // Update user state
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error while userAuthentication", error);
    }
  }, [token]); // Now, userAuthentication is memoized and only redefined when the token changes.

  // Refetch user data whenever token changes
  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]); // <-- This now safely depends on the memoized function

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, storeTokenInLs, logoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
