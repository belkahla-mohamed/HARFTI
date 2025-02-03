import React from "react";
import { Laptop, Cog, User, Star, ClipboardList, Wallet } from 'lucide-react';


export default function Features() {
    const styleIcon = 'w-10 h-10 '
    const styleDive = 'text-center flex flex-col justify-center cursor-pointer w-full ease-in-out hover:font-bold duration-300'
    return (
        <div className="w-full mt-20 bg-gray-300 py-4 px-4 rounded-md shadow-lg">
            <div className="sm:flex   grid grid-cols-2 gap-4 ">
            
                <div className={`${styleDive} hover:text-blue-500`}>
                    <div className="w-full flex   justify-center">
                        <Laptop className={styleIcon} />
                    </div>
                    <h1>Job Search</h1>
                </div>
                <div className={`${styleDive} hover:text-gray-500`}>
                    <div className="w-full flex  justify-center">
                        <Cog className={styleIcon} />
                    </div>
                    <h1>Advanced Filters</h1>
                </div>
                <div className={`${styleDive} hover:text-gray-700`}>
                    <div className="w-full flex  justify-center">
                        <User className={styleIcon} />
                    </div>
                    <h1>User Profiles</h1>
                </div>
                <div className={`${styleDive} hover:text-yellow-500`}>
                    <div className="w-full flex  justify-center">
                        <Star className={styleIcon} />
                    </div>
                    <h1>Reviews and Ratings</h1>
                </div>
                <div className={`${styleDive} hover:text-green-500`}>
                    <div className="w-full flex  justify-center">
                        <ClipboardList className={styleIcon} />
                    </div>
                    <h1>Resume Builder</h1>
                </div>
                <div className={`${styleDive} hover:text-amber-950`}>
                    <div className="w-full flex  justify-center">
                        <Wallet className={styleIcon} />
                    </div>
                    <h1>Economical Price</h1>
                </div>
            </div>
        </div>
    )
}