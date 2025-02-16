import React from "react";

import Navbar from "./pages/NavBar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./pages/Home/Footer";
import Register from "./pages/User/Register";
import Profile from "./pages/User/Profile";
import Services from "./pages/Service/Services";
import EmployeesService from "./pages/Service/EmployeesService";

export default function App() {



    return (
        <>

            <BrowserRouter>
                <Navbar />
                <div className=' sm:mx-[10em] 2xl:mx-[18em]'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Worker" />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/Services" element={<Services />} />
                        <Route path="/Services/:service" element={<EmployeesService/>} />
                    </Routes>
                </div>
                <Footer />

            </BrowserRouter>

        </>

    )
}