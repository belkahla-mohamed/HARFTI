import { Facebook, Instagram, Phone, Twitter } from "lucide-react";
import React from "react";


export default function Footer() {
    return (
        <div className="flex w-full bg-[#333333] text-orange-400 flex-col mt-20 px-5 sm:px-28 2xl:px-38 pt-10 pb-4  h-full select-none">

            <div className="w-full flex-wrap flex justify-start sm:justify-center gap-5 sm:gap-8 2xl:gap-15 items-center  ">


                <div className="w-full sm:w-[40%]">
                <img src="/logo/logo.png" className="w-44 h-[150px]"  />
                    <p className=" w-full sm:w-[80%] text-gray-300">At Jobe, we are committed to helping job seekers find their ideal careers while enabling employers to discover top talent. Our platform offers seamless job searches, career resources, and industry insights to support your professional journey.</p>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Navigation</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li>Home</li>
                        <li>Features</li>
                        <li>Services</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Informations</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li>+344 234243</li>
                        <li>mohamedmouad@gmail.com</li>
                        <li>Lahraouine, Madyouna, Xixan</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Opning Hours</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li>every days</li>
                        <li>every weeks</li>
                        <li>forever</li>
                    </ul>
                </div>


            </div>

            <div className="w-full flex mt-8 items-end justify-center">
                <p>📧 Support: support@jobe.com | 🌍 Website: www.jobe.com</p>
            </div>

            <div className="w-full flex mt-4 justify-center sm:space-x-20 space-x-10 p-2">

                <div className="border border-1 hover:border-2 border-gray-300 rounded-4xl p-2 cursor-pointer">
                    <Facebook className="stroke-1 hover:stroke-2 text-gray-300" />
                </div>
                <div className="border border-1 hover:border-2 border-gray-300 rounded-4xl p-2 cursor-pointer">
                    <Instagram className="stroke-1 hover:stroke-2 text-gray-300" />
                </div>
                <div className="border border-1 hover:border-2 border-gray-300 rounded-4xl p-2 cursor-pointer">
                    <Phone className="stroke-1 hover:stroke-2 text-gray-300" />
                </div>
                <div className="border border-1 hover:border-2 border-gray-300 rounded-4xl p-2 cursor-pointer" >
                    <Twitter className="stroke-1 hover:stroke-2 text-gray-300" />
                </div>
            </div>
        </div>
    )

}