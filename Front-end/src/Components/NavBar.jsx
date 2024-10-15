import { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo"
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { RiCloseLine } from "react-icons/ri";
import gsap from "gsap";
import { useAuth } from "../store/useauth";



export const NavBar = () => {
  const [Click, setClick] = useState(false);

  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();

  const { isLoggedIn, logoutUser } = useAuth(); 
   const handleLogout = () => {
     logoutUser(); // Call the logout function
     navigate("/login"); // Redirect to the login page after logout
   };


  const handleclick = () => {
    setClick(!Click);
  };
   

  useEffect(() => {
       if (Click) {
         // Animate the menu sliding in
         gsap.fromTo(
           menuRef.current,
           {
             opacity: 0,
             y: -50,
           },
           {
             opacity: 1,
             y: 0,
             duration: 0.5,
             ease: "power3.out"
           }
         );
         // Animate the menu icon (rotating in)
         gsap.to(iconRef.current, {
           rotate: 180, // rotate the icon
           scale: 1.1, // slightly scale it up
           duration: 1,
           ease: "power2.out",
         });
       } else {
         // Animate the menu sliding out
         gsap.to(menuRef.current, {
           opacity: 0,
           y: -50,
           duration: 0.5,
           ease: "power3.in",
           onComplete: () => {
             if (menuRef.current) {
               menuRef.current.style.display = "none"; // Hide after animation
             }
           },
         });
         // Animate the menu icon (rotating back)
         gsap.to(iconRef.current, {
           rotate: 0, // rotate back
           scale: 1, // reset the scale
           duration: 0.3,
           ease: "power2.in",
         });
       }
     }, [Click]);
  

  return (
    <>
      <header className="bg-primary-400  p-2 w-full">
        <div className="flex justify-around items-center ">
          <div className="">
            <Logo />
          </div>

          {/* For big screen */}
          <div className="hidden md:flex space-x-2 text-white">
            <ul className="flex space-x-10 items-center ">
              <NavLink
                to="/"
                className="flex  border-b-2 border-transparent hover:border-primary-600 transition-all ease-in-out duration-500 font-bold "
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="about"
                className="flex border-b-2 border-transparent hover:border-primary-600 transition-all ease-in-out duration-500 font-bold "
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="contact"
                className="flex border-b-2 border-transparent hover:border-primary-600 transition-all ease-in-out duration-500  font-bold "
              >
                <li>Contact</li>
              </NavLink>
            </ul>
          </div>

          {/* sign up and log in button */}
          <div className="hidden md:flex space-x-3 items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-primary-600 text-white hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold transition-all ease-in-out duration-300"
              >
                Log out
              </button>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="bg-primary-600 text-white hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold transition-all ease-in-out duration-300"
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  className="bg-primary-600 text-white hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold transition-all ease-in-out duration-300"
                >
                  Log in
                </NavLink>
              </>
            )}
          </div>

          {/* For mobile screen icons */}
          <div className="md:hidden relative right-0 flex items-center gap-2 ">
            <button onClick={handleclick} className="text-xl">
              <span ref={iconRef}>{Click ? <RiCloseLine /> : <CgMenu />}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          style={{ display: Click ? "block" : "none" }}
          className="md:hidden mt-4 relative"
        >
          <ul className="flex flex-col space-y-2 text-center ">
            <li className=" hover:bg-blue-300">
              <NavLink to="/about" onClick={() => setClick(false)}>
                About
              </NavLink>
            </li>
            <li className="   hover:bg-blue-300">
              <NavLink to="/contact" onClick={() => setClick(false)}>
                Contact
              </NavLink>
            </li>
            <li className="  hover:bg-blue-300 cursor-pointer">
              <NavLink to="/services" onClick={() => setClick(false)}>
                Services
              </NavLink>
            </li>
          </ul>

          <div className="grid grid-cols-1 pt-3  space-y-3 items-center ">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-primary-600 text-white text-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold"
              >
                Log out
              </button>
            ) : (
              <>
                <NavLink
                  className="bg-primary-600 text-white text-center hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold "
                  to="/signup"
                >
                  Sign up
                </NavLink>
                <NavLink
                  className="bg-primary-600 text-white text-center hover:bg-primary-700focus:ring-4 focus:outline-none focus:ring-primary-300 px-3 py-2 rounded-xl cursor-pointer font-bold "
                  to="/login"
                >
                  Log in
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
