import React from "react";
import Navbar from "./pages/NavBar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./pages/Home/Footer";
import Register from "./pages/User/Register";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <div className=' sm:mx-[10em] 2xl:mx-[18em]'>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Services" />
                        <Route path="/Worker" />
                        <Route path="/Register" element={<Register/>} />
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>

        </>
    )
}