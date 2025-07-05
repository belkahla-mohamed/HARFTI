import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
    Package, ShowerHead, PaintRoller, Wrench, BrickWall, Sprout, 
    Axe, Anvil, Gem, ScissorsLineDashed, Palette, Briefcase, Flame,
    Phone,
    PhoneCall
} from "lucide-react";
import Combobox from "./select";

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

export default function Worker() {
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState("");
    const [servicesTitle, setServicesTitle] = useState("All Workers");
    const [newWorker, setNewWorker] = useState([]);
    const [Index, setIndex] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        axios.get("https://harftibackend-production.up.railway.app/services/employees")
            .then((res) => {
                if (res.data.status === "success") {
                    setWorkers(res.data.workers);
                    setNewWorker(res.data.workers);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage("Error loading workers.");
            });
    }, []);

    useEffect(() => {
        if (servicesTitle === "" || servicesTitle === "All Workers") {
            setNewWorker(workers);
        } else {
            setNewWorker(
                workers.filter((worker) => Array.isArray(worker.service) && worker.service.includes(servicesTitle))
            );
        }
    }, [servicesTitle, workers]);

    return (
        <div className="flex flex-col sm:px-0 px-9 py-10 w-full min-h-screen rounded-b-sm">
            <div className="w-full text-center text-orange-500 text-3xl font-bold pb-9">
                <h1 className="text-center sm:text-6xl text-2xl font-extrabold text-orange-500 cursor-default">
                    The Workers
                </h1>
            </div>
            <div className="w-full mb-9 flex justify-center">
                <Combobox setServicesTitle={setServicesTitle} />
            </div>

            {newWorker.length ? (
                <motion.div
                    className="w-full grid grid-cols-1 sm:grid-cols-4 gap-5 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    {newWorker.map((worker, index) => {
                        // Ensure worker.service is an array
                        let services = worker.service;
                        if (typeof services === "string") {
                            try {
                                services = JSON.parse(services); // Convert to array
                            } catch (error) {
                                console.error("Error parsing services:", error);
                                services = []; // Fallback to empty array
                            }
                        }

                        // Determine correct folder based on file name
                        const folder = worker.photo?.startsWith("avatar")
                            ? "uploads"
                            : "EmployeePhotos";

                        // Construct image source path
                        const imageSource = worker.photo
                            ? `https://harftibackend-production.up.railway.app/${folder}/${worker.photo}`
                            : "https://harftibackend-production.up.railway.app/uploads/default.png"; // Default image

                        return (
                            <motion.div
                                key={worker.id}
                                className="flex-col p-3 rounded-xl shadow-xl bg-gray-300 space-y-2 flex items-center w-full hover:shadow-2xs duration-200 ease-in flex-wrap"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    className="w-32 h-32 rounded-full object-cover"
                                    src={imageSource}
                                    alt={worker.fullname}
                                />
                                <div className="text-center">
                                    <p className="text-xl font-bold">{worker.fullname}</p>
                                    <p className="text-sm text-[#333333]">{worker?.phone || "N/A"}</p>
                                    <p className="text-sm text-[#333333]">{worker.age} years old</p>
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

                                <div className="w-full flex justify-center mt-3">
                                    <Link to="/location">
                                        <button onMouseEnter={() => setIndex(index)} onMouseLeave={() => setIndex(null)} className="flex bg-orange-500 hover:bg-orange-600 ease-in-out duration-100 p-2 rounded font-bold text-white gap-2 cursor-pointer">
                                            {Index === index ? <PhoneCall/> : <Phone />} Contact Now
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            ) : (
                <p className="sm:text-2xl text-xl text-gray-400 text-center font-bold">
                    No {servicesTitle}s found.
                </p>
            )}
        </div>
    );
}
