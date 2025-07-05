import React from "react";
import axios from "axios";

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
    Calendar, Mail, User, Phone,
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller,
    PhoneCall
} from "lucide-react";

const iconsMap = {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller
};


export default function ProfileEmployee() {
    const [employee, setEmployee] = useState();
    const [employeeServices, setEmployeeServices] = useState();
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const { username } = useParams();
    const iconsClass = "w-5 h-5 text-gray-700";
    const [call, setCall] = useState(false)

    useEffect(() => {
        window.scrollTo({top:0})
    }, [])


    useEffect(() => {
        const fetchEmployee = async () => {
            if (username) {
                try {
                    const res = await axios.get(`https://harftibackend-production.up.railway.app/post/ProfileEmployee/${username}`);
                    if (res.data.status === "success") {
                        setEmployee(res.data.employee);
                        setEmployeeServices(res.data.employee.service || []);
                    } else {
                        navigate('/Posts');
                    }
                } catch (error) {
                    console.error("Error fetching employee data:", error);
                }
            }
        };

        fetchEmployee();
    }, [username]);


    useEffect(() => {
        if (!employee || !employeeServices?.length) return;

        axios.get('https://harftibackend-production.up.railway.app/services')
            .then((res) => {
                if (res.data.status === "success" && Array.isArray(res.data.services)) {
                    setServices(res.data.services.filter(s => employeeServices.includes(s.title)));
                }
            })
            .catch((err) => console.error("Error fetching services:", err));
    }, [employeeServices]);




    const folder = employee?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';

    const imageSource = employee?.photo
        ? `https://harftibackend-production.up.railway.app/${folder}/${employee.photo}`
        : 'https://harftibackend-production.up.railway.app/uploads/default.png';

    return (
        <div className="w-full justify-center flex">
            <div className="sm:w-[50%] w-full p-4 shadow-2xl sm:bg-[url('/test4.jpg')] bg-[url('/test6.jpg')] bg-cover bg-center  rounded-sm text-center  h-[auto] mt-5  flex-col flex pb-11 items-center">
                <div className="flex flex-col h-auto w-full items-center gap-y-4">
                    {/* Profile Image */}
                    <img src={imageSource} className="rounded-[50%] h-30 w-30 flex justify-center " />

                    {/* Profile Details */}
                    <div className="text-black w-[70%]">
                        <p className="text-2xl font-bold text-[#333333]">{employee?.fullname}</p>

                        <div className="w-full items-center cursor-default flex justify-center ">
                            <div className="flex gap-x-6">
                                <p className="text-[15px]">{employee?.email}</p>
                            </div>
                        </div>

                        <div className="block sm:grid  sm:grid-cols-2 mt-4 gap-y-2 text-black">

                            {/* Left Column */}
                            <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6  ">
                                <User className={iconsClass} />
                                <p>{employee?.username}</p>
                            </div>


                            <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6">
                                <Calendar className={iconsClass} />
                                <p>{employee?.age} years old</p>
                            </div>
                            {/* Right Column */}

                            <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6 ">
                                <Phone className={iconsClass} />
                                <p className="break-words">{employee?.phone}</p>
                            </div>


                            {/* Services */}

                            <div className="col-span-2 cursor-default">
                                <h1 className="text-start mb-2 font-bold text-[#333333]">Services : </h1>
                                <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 justify-center sm:justify-center">
                                    {services.map((service) => (
                                        <div
                                            key={service.title}
                                            className="flex items-center hover:text-orange-500 bg-gray-100 px-2 py-1 rounded-lg text-sm text-gray-800 shadow-sm"
                                        >
                                            {iconsMap[service.icon] && React.createElement(iconsMap[service.icon], { className: "w-5 h-5 text-gray-600 mr-2" })}
                                            <p>{service.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="w-full flex justify-center mt-3">
                            <Link to="/location">
                                <button onMouseEnter={() => setCall(true)} onMouseLeave={() => setCall(false)} className="flex bg-orange-500 hover:bg-orange-600 ease-in-out duration-100 p-2 rounded font-bold text-white gap-2 cursor-pointer">
                                    {call ? <PhoneCall/> : <Phone  />} Contact Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}