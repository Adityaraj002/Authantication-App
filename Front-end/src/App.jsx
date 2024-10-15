// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import {Contact} from './pages/Contact'
import { Services } from "./pages/Services"
import { NavBar } from "./Components/NavBar"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
// import Navbar2 from "./Components/NavBar2"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div id="router" className=" ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
