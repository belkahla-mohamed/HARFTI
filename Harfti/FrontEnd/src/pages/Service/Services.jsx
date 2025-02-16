import {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench
} from "lucide-react";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// خريطة للأيقونات المتاحة
const iconsMap = {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench
};

export default function Services() {
    const [message, setMessage] = useState('');
    const [services, setServices] = useState([]); // ✅ تحديد قيمة افتراضية كمصفوفة فارغة

    useEffect(() => {
        axios.get('http://localhost:3001/services')
            .then((res) => {
                if (res.data.status === "success") {
                    setServices(res.data.services);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(services);

    const iconsClass = "w-20 h-20 text-white";
    const titleClass = "text-center text-white font-bold hover:drop-shadow-[0_0_10px_white] drop-shadow-[0_2px_0px_#333333] cursor-default duration-100 ease-in-out";

    return (
        <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center select-none">
            <h1 className="text-start sm:text-6xl text-5xl font-extrabold text-orange-500 cursor-default">
                Our Services
            </h1>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-12 2xl:gap-32 p-10">
                {services?.map((service, index) => (
                    <Link key={index} to={`/Services/${service.title}`}>
                        <div
                            key={index}
                            className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4"
                        >
                            {/* عرض الأيقونة إذا كانت موجودة في الخريطة */}
                            <p>
                                {iconsMap[service.icon] && React.createElement(iconsMap[service.icon], { className: iconsClass })}
                            </p>
                            <p className={titleClass}>{service.title}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
}
