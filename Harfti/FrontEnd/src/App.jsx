

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

export default function App() {



    return (
        <>

            <BrowserRouter>
                <Navbar />
                <div className=' sm:mx-[10em] 2xl:mx-[18em]'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/Services" element={<Services />} />
                        <Route path="/location" element={<Location />} />
                        <Route path="/Problem" element={<Formulaire />} />
                        <Route path="/Problem/Payment" element={<Index />} />
                        <Route path="/Problem/Payment/Cash" element={<Cash />} />
                        <Route path="/Problem/Payment/Online" element={<Online />} />
                        <Route path="/Worker" element={<Worker/>} />
                        <Route path="/Services/:service" element={<EmployeesService/>} />
                    </Routes>
                </div>
                <Footer />

            </BrowserRouter>

        </>

    )
}