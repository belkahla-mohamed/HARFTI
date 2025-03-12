import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { 
    Package, ShowerHead, PaintRoller, Wrench, BrickWall, Sprout, 
    Axe, Anvil, Gem, ScissorsLineDashed, Palette, Briefcase, Flame,
    Phone
} from "lucide-react";
import gsap from "gsap";

// Define a mapping of services to icons
const serviceIcons = {
    "Delivery Person": Package,
    "Plumber": ShowerHead,
    "Painter": PaintRoller,
    "Mechanic": Wrench,
    "Builder": BrickWall,
    "Gardener": Sprout,
    "Carpenter": Axe,
    "Blacksmith": Anvil,
    "Goldsmith": Gem,
    "Tailor": ScissorsLineDashed,
    "Craftsperson": Palette,
    "Leatherworker": Briefcase,
    "Welder": Flame
};

export default function EmployeesService() {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState();
    const params = useParams()
    const { service } = params;

    const emplRefs = useRef([]);

    useEffect(() => {

        window.scrollTo({ top: 0 })
        axios.get("http://127.0.0.1:3001/services/employees");
        axios.post("http://127.0.0.1:3001/services/employees", { service })
            .then((res) => {
                if (res.data.status === 'success') {
                    setEmployees(res.data.employees);
                    setMessage(res.data.message)
                } else {
                    setMessage(res.data.message)
                }
            }).catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (emplRefs.current.length) {
            gsap.from(emplRefs.current, {
                y: 50,
                opacity: 0,
                stagger: 0.3, // Adjusted to be faster
                duration: 0.3
            });
        }
    }, [employees]);
    return (
        <div className="min-h-screen px-9 sm:px-0 w-full flex flex-col gap-10 mt-20 items-center select-none">
            <h1 className="sm:text-start text-center sm:text-6xl text-2xl  font-extrabold text-orange-500 cursor-default">Workers in {service}</h1>





            {employees.length ? (<motion.div
                className="w-full grid grid-cols-1  sm:grid-cols-4 gap-5 justify-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
            >
                {employees.map((employee) => {

                    // Ensure worker.service is an array
                    let services = employee.service;
                    if (typeof services === "string") {
                        try {
                            services = JSON.parse(services); // Convert to array
                        } catch (error) {
                            console.error("Error parsing services:", error);
                            services = []; // Fallback to empty array
                        }
                    }

                    const folder = employee?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';

                    const imageSource = employee && employee.photo
                        ? `http://localhost:3001/${folder}/${employee.photo}`
                        : 'http://localhost:3001/uploads/default.png';
                    return (
                        <motion.div
                            key={employee.id}
                            className="flex-col p-3   rounded-xl shadow-xl bg-gray-300 space-y-2 flex items-center    w-full    hover:shadow-2xs duration-200 ease-in flex-wrap"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >


                            <img
                                className="w-32 h-32 rounded-full object-cover"
                                src={imageSource}
                                alt={employee.fullname}
                            />
                            <div className="  text-center">
                                <p className="text-xl font-bold "> {employee.fullname}</p>
                                <p className="text-sm text-[#333333]">{employee?.phone || "N/A"}</p>
                                <p className="text-sm text-[#333333]">{employee.age} years old</p>
                            </div>

                            {/* Display Services */}
                            <div className="flex flex-wrap justify-center gap-2 mt-1">
                                {(Array.isArray(services) ? services : []).map((service, index) => (
                                    service && (
                                        <span key={index} className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                                            {serviceIcons[service] && React.createElement(serviceIcons[service], { className: "w-4 h-4 mr-1" })}
                                            {service}
                                        </span>
                                    )
                                ))}
                            </div>

                            <div className="w-full flex justify-center">
                                <Link to="/location">
                                    <button
                                        className="flex bg-orange-500 hover:bg-orange-600 ease-in-out duration-100 p-2 rounded font-bold text-white gap-2 cursor-pointer"
                                    >
                                        <Phone /> Contact Now
                                    </button>
                                </Link>

                            </div>
                        </motion.div>
                    )

                })}</motion.div>
            ) : (
                <p className="sm:text-2xl text-sm text-gray-400 text-center font-bold">Aucun {service}s trouvé.</p>
            )}






        </div>


    )
}