import Navbar from "./pages/NavBar";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./pages/Home/Footer";
import Register from "./pages/User/Register";
import Profile from "./pages/User/Profile";
import Services from "./pages/Service/Services";
import EmployeesService from "./pages/Service/EmployeesService";
import Location from "./pages/location/Location";
import Formulaire from "./pages/reserver/Formulaire";
import Index from "./pages/payment";
import Cash from "./pages/payment/Cash";
import Online from "./pages/payment/Online";
import Worker from "./pages/job/Worker";
import Form from "./pages/User/to job/form";
import NotFound from "./notFound/NotFound";
import AddPost from "./pages/posts/AddPost";
import Posts from "./pages/posts/Posts";
import ProfileEmployee from "./pages/posts/ProfileEmployee";
import { useEffect, useState } from "react";

import NavAdmin from "./pages/Admin/Dashbord/NavAdmin";
import Analyse from "./pages/Admin/Dashbord/Analyse";
import DashService from "./pages/Admin/Dashbord/DashService";
import DashUser from "./pages/Admin/Dashbord/DashUser";
import Show from "./pages/Admin/Dashbord/Show";
import DashEmployee from "./pages/Admin/Dashbord/DashEmploye";
import DashReservation from "./pages/Admin/Dashbord/DashReservation";

export default function App() {

    function scrollTopHome() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const [role, setRole] = useState('');

    useEffect(() => {
        const storedRole = JSON.parse(sessionStorage.getItem('role'));
        setRole(storedRole);
    }, []);

    return (
        <>

            <BrowserRouter>
                {role === 'admin' ? <NavAdmin /> : <Navbar />}
                <div className={`${role === "admin" ? "" : "sm:mx-[10em] 2xl:mx-[18em]"}`}>
                    <Routes>
                        {
                            role === 'admin' ? (
                                // ✅ Routes spéciales pour l'admin
                                <>
                                    <Route path="/" element={<Analyse />} />
                                    <Route path="/dashService" element={<DashService />} />
                                    <Route path="/Profile/:id" element={<Show />} />
                                    
                                    <Route path="/dashUser" element={<DashUser />} />
                                    <Route path="/dashEmployee" element={<DashEmployee />} />
                                    <Route path="/dashReservation" element={<DashReservation />} />
                                    <Route path="*" element={<NotFound />} />
                                    

                                    {/* ici les routes spécifiques admin */}
                                </>
                            ) : (
                                <>


                                    <Route path="/" element={<Home />} />
                                    <Route path="/Profile" element={<Profile />} />
                                    <Route path="/Register" element={<Register />} />
                                    <Route path="/Services" element={<Services />} />
                                    <Route path="/location" element={<Location />} />
                                    <Route path="/Problem" element={<Formulaire />} />
                                    <Route path="/Problem/Payment" element={<Index />} />
                                    <Route path="/Problem/Payment/Cash" element={<Cash />} />
                                    <Route path="/Problem/Payment/Online" element={<Online />} />
                                    <Route path="/Worker" element={<Worker />} />
                                    <Route path="/Services/:service" element={<EmployeesService />} />
                                    <Route path="/ToWorker" element={<Form />} />
                                    <Route path="/Posts/AddPost" element={<AddPost />} />
                                    <Route path="/Posts" element={<Posts />} />
                                    <Route path="/Posts/ProfileEmployee/:username" element={<ProfileEmployee />} />
                                    <Route path="*" element={<NotFound />} />
                                </>)}
                    </Routes>
                </div>
                {role === 'admin' ? '' :<Footer scrollTopHome={scrollTopHome} /> } 

            </BrowserRouter>

        </>

    )
}