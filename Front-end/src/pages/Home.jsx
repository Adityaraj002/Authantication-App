import { useAuth } from "../store/useauth";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>You are in Home</h1>
      <div className="p-4 bg-gray-50 rounded-lg shadow-md">
        {user ? ( // Check if user exists before rendering
          <>
            {user.profile && (
              <img
                src={user.profile}
                className="w-32 h-32 rounded-full mb-4 text-center"
                alt="User Profile"
              />
            )}
            <p className="text-lg font-semibold">
              Username: {user.username || "N/A"}
            </p>
            <p className="text-lg font-semibold">
              Full Name: {user.fullName || "N/A"}
            </p>
            <p className="text-lg font-semibold">
              Phone Number: {user.phoneNo || "N/A"}
            </p>
            <p className="text-lg font-semibold">
              Email: {user.email || "N/A"}
            </p>
          </>
        ) : (
          <p>Loading user data...</p> // Display a message or a spinner while user data is loading
        )}
      </div>
    </div>
  );
};
