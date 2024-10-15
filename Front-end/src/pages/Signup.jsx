import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useauth";

export const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    profile: null, // change to null to hold file object
  });

  const navigation = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(); // Create a FormData object
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/signup`, {
        method: "POST",
        body: formData, // send FormData directly
      });

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        const errorText = await response.text(); // get response text for debugging
        console.error("Server responded with an error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigation("/login");
      const res_data = await response.json(); // parse the response
      console.log("res from  server  ", res_data.data.accessToken); // log the response data
      // localStorage.setItem("accesstoken", res_data.data.accessToken);

      storeTokenInLs(res_data.data.accessToken);
    } catch (error) {
      console.error("Error during registration: ", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0], // set the file object to state
    });
  };

  return (
    <>
      <div className="grid md:grid-cols-2  p-6 ">
        <div className="hidden md:block rounded-2xl shadow hover:shadow-2xl">
          <img src="Signup.svg" alt="" className=" " />
        </div>

        <div className=" p-4 mx-2  rounded-2xl shadow hover:shadow-2xl">
          <div className="my-2">
            <h1 className="text-2xl font-Playfair font-playfair-800 py-1">
              Create your Account
            </h1>
            <p className="py-1 font-Playfair font-playfair-500">
              Start your website in seconds. Already have an account?
              <Link
                to="/login"
                className="px-2 font-medium text-primary-600 hover:underline"
              >
                Login here.
              </Link>
            </p>
          </div>

          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-Playfair font-playfair-600 ">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  FullName
                </label>
                <input
                  value={user.fullName}
                  onChange={handleInput}
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  type="text"
                  placeholder="user"
                  name="fullName"
                  id="fullName"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  Username
                </label>
                <input
                  value={user.username}
                  onChange={handleInput}
                  type="text"
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  placeholder="user002"
                  name="username"
                  id="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  Email
                </label>
                <input
                  value={user.email}
                  onChange={handleInput}
                  type="email"
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  placeholder="user@gmail.com"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  Password
                </label>
                <input
                  value={user.password}
                  onChange={handleInput}
                  type="password"
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  placeholder="••••••••"
                  name="password"
                  id="password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  value={user.phoneNo}
                  onChange={handleInput}
                  type="tel"
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  placeholder="9999999999"
                  name="phoneNo"
                  id="phoneNo"
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-4">
                  <label
                    className="mb-2 text-sm font-medium text-gray-900"
                    htmlFor="file_input"
                  >
                    Upload Profile
                  </label>
                  <label
                    htmlFor="file_input"
                    className="text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-blue-500 text-center py-2 px-2"
                  >
                    Choose File
                  </label>
                </div>
                <input
                  onChange={handleFileChange} // update handler for file input
                  id="file_input"
                  type="file"
                  className="hidden"
                  name="profile"
                  accept="image/*" // Optional: accept only image files
                />
                <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>

            <div className="my-2">
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 font-Playfair font-medium rounded-lg  text-sm  px-5 py-2.5 text-center"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
