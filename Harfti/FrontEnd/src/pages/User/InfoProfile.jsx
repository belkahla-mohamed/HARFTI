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
    const [service, setService] = useState(null);
    const iconsClass = "w-5 h-5 text-gray-700"; // Define the icon styling

    useEffect(() => {
        if (!user || !user.service) return;

        axios.get('http://localhost:3001/services')
            .then((res) => {
                if (res.data.status === "success" && Array.isArray(res.data.services)) {
                    const foundService = res.data.services.find(s => s.title === user.service);
                    if (foundService) {
                        setService(foundService);
                    }
                }
            })
            .catch((err) => console.log(err));
    }, [user]);

    const folder = user?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';

    const imageSource = avatar
        ? `http://localhost:3001/uploads/${avatar}`
        : photo
            ? `http://localhost:3001/EmployeePhotos/${photo}`
            : user && user.photo
                ? `http://localhost:3001/${folder}/${user.photo}`
                : 'http://localhost:3001/uploads/default.png';

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
                <div className="grid grid-cols-1 mt-4 justify-center sm:grid-cols-2 gap-x-10 gap-y-2 sm:gap-y-2 text-black">
                    {/* Left Column */}
                    <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6  ">
                        <User className={iconsClass} />
                        <p>{user?.username}</p>
                    </div>
                    {user?.role === "employe" &&
                        <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6">
                            <Calendar className={iconsClass} />
                            <p>{user?.age} years old</p>
                        </div>}

                    {/* Right Column */}
                    {user?.role === "employe" &&
                        <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6 ">
                            <Phone className={iconsClass} />
                            <p className="break-words">{user?.phone}</p>
                        </div>
                    }
                    {user?.role === "employe"
                        &&
                        <div className="flex items-center cursor-default hover:text-orange-500 justify-start gap-x-6">
                            {service && iconsMap[service.icon] && React.createElement(iconsMap[service.icon], { className: iconsClass })}
                            <p>{service?.title}</p>
                        </div>
                    }


                </div>

                {/* Email Section */}

            </div>
        </div>
    );
}
