import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Calendar, Mail, User, Phone,
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller
} from "lucide-react";

const iconsMap = {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller
};

export default function InfoProfile({ user, photo, avatar }) {
    const [services, setServices] = useState([]);  // Store all matching services
    const iconsClass = "w-5 h-5 text-gray-700"; // Define the icon styling

    useEffect(() => {
        if (!user || !user.service || !Array.isArray(user.service)) return;

        axios.get('https://harftibackend-production.up.railway.app/services')
            .then((res) => {
                if (res.data.status === "success" && Array.isArray(res.data.services)) {
                    // Find services that match user's services (since user.service is an array)
                    const foundServices = res.data.services.filter(s => user.service.includes(s.title));
                    setServices(foundServices);
                }
            })
            .catch((err) => console.log(err));
    }, [user]);

    const folder = user?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';

    const imageSource = avatar
        ? `https://harftibackend-production.up.railway.app/uploads/${avatar}`
        : photo
            ? `https://harftibackend-production.up.railway.app/EmployeePhotos/${photo}`
            : user && user.photo
                ? `https://harftibackend-production.up.railway.app/${folder}/${user.photo}`
                : 'https://harftibackend-production.up.railway.app/uploads/default.png';

    return (
        <div className="flex flex-col h-auto w-full items-center gap-y-4">
            {/* Profile Image */}
            <img title="Click To Update" onClick={() => setImag(true)} src={imageSource} className="rounded-[50%] h-30 w-30 flex justify-center " />

            {/* Profile Details */}
            <div className="text-black w-[70%]">
                <p className="text-2xl font-bold text-[#333333]">{user?.fullname}</p>

                <div className="w-full items-center cursor-default flex justify-center ">
                    <div className="flex gap-x-6">
                        <p className="text-[15px]">{user?.email}</p>
                    </div>
                </div>

                <div className="block sm:grid  sm:grid-cols-2 mt-4 gap-y-2 text-black">
                    
                    {/* Left Column */}
                    <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6  ">
                        <User className={iconsClass} />
                        <p>{user?.username}</p>
                    </div>

                    {user?.role === "employee" &&
                        <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6">
                            <Calendar className={iconsClass} />
                            <p>{user?.age} years old</p>
                        </div>}

                    {/* Right Column */}
                    {user?.role === "employee" &&
                        <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6 ">
                            <Phone className={iconsClass} />
                            <p className="break-words">{user?.phone}</p>
                        </div>
                    }

                    {/* Services */}
                    {user?.role === "employee" && services.length > 0 && (
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
                        
                    )}
                </div>
            </div>
        </div>
    );
}
