import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useauth";

export const Login = () => {
  const [logOutuser, setlogOutUser] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigate();
  const { storeTokenInLs } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setlogOutUser({
      ...logOutuser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logOutuser),
      });

      // console.log("login user : ", response);

      if (response.ok) {
        const res_data = await response.json(); // parse the response
        // console.log("res from  server  ", res_data.data.accessToken); // log the response data
        // localStorage.setItem("accesstoken", res_data.data.accessToken);
        storeTokenInLs(res_data.data.accessToken);
        // alert("Login SuccessFul");
        setlogOutUser({ email: "", password: "" });
        navigation("/");
      } else {
        alert("Invalid credential");
        // console.log("Invalid credential");
      }
    } catch (error) {
      console.error("error login : ", error);
    }
  };

  return (
    <>
      {/* mobile */}
      <div className=" grid grid-cols-1 md:grid-cols-2 px-14 py-8 md:space-x-5">
        {/* image */}
        <div className=" hidden md:block rounded-2xl  hover:shadow-2xl ">
          <img src="/webimg.jpg" alt="" className="rounded-2xl" />
        </div>

        {/* form */}
        <div className="space-y-2 rounded-2xl shadow hover:shadow-2xl ">
          <h1 className="text-center font-Oswald font-oswald-bold text-3xl ">
            Login
          </h1>
          <div className="p-3">
            <form action="" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-Playfair font-playfair-800 text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                  placeholder="name@gmail.com"
                  required
                  value={logOutuser.email}
                  onChange={handleInput}
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
                  type="password"
                  name="password"
                  value={logOutuser.password}
                  onChange={handleInput}
                  id="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border py-2.5 px-2.5 border-gray-300 text-gray-900 font-Playfair font-playfair-400 rounded-lg focus:ring-2 focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full"
                />
              </div>

              <div className="md:flex items-center justify-between">
                <div className="flex items-start ">
                  <div className="md:flex items-center h-5">
                    <input
                      type="checkbox"
                      id="remember"
                      aria-describedby="remember"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="text-gray-500">Remember me</label>
                  </div>
                </div>

                <Link
                  className="text-sm font-medium text-primary-600 hover:underline "
                  to=""
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  text-sm  px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
