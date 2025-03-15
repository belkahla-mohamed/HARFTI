import { ChevronUp, Facebook, Instagram, Mouse, Phone, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";


export default function Footer({ scrollTopHome }) {
    return (
        <div className="flex relative w-full bg-[#333333] text-orange-400 flex-col mt-20 px-5 sm:px-28 2xl:px-38 pt-10 pb-4  h-full select-none">

            <div className="w-full flex-wrap flex justify-start sm:justify-center gap-5 sm:gap-8 2xl:gap-15 items-center  ">


                <div className="w-full sm:w-[40%]">
                    <img src="/logo/logo.png" className="w-44 h-[150px]" />
                    <p className=" w-full sm:w-[80%] text-gray-300">At Jobe, we are committed to helping job seekers find their ideal careers while enabling employers to discover top talent. Our platform offers seamless job searches, career resources, and industry insights to support your professional journey.</p>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Navigation</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li >
                            <Link to="/">
                                <p className="hover:text-orange-400">Home</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Services">
                                <p className="hover:text-orange-400">Services</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Worker">
                                <p className="hover:text-orange-400">Employees</p>
                            </Link>

                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Informations</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li>
                            <p className="hover:text-orange-400">+344 234243</p>
                        </li>
                        <li>
                            <p className="hover:text-orange-400">mohamedmouad@gmail.com</p>
                        </li>
                        <li>
                            <p className="hover:text-orange-400">Lahraouine, Madyouna, Xixan</p>
                        </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Opning Hours</h1>
                    <ul className="space-y-2 text-gray-300 pl-2">
                        <li>
                            <p className="hover:text-orange-400">every days</p>

                        </li>
                        <li>
                            <p className="hover:text-orange-400">every weeks</p>

                        </li>
                        <li>
                            <p className="hover:text-orange-400">forever</p>

                        </li>
                    </ul>
                </div>


            </div>

            <div className="w-full flex mt-8 items-end justify-center">
                <p>📧 Support: support@jobe.com | 🌍 Website: www.jobe.com</p>
            </div>
            <p title="Scroll To Top" className="w-full flex justify-center sm:justify-end" onClick={scrollTopHome}>
                <Mouse className="text-white   hover:text-orange-400 rounded-2xl w-10 h-10" />
            </p>

            <div className="w-full flex mt-4 justify-center sm:space-x-20 space-x-10 p-2">

                <div className="">
                    <Facebook className="w-10 h-10 border border-1 hover:shadow hover:shadow-orange-400 border-gray-300 hover:border-orange-400 rounded-4xl p-2 cursor-pointer  text-gray-300 hover:text-orange-400" />
                </div>
                <div >
                    <Instagram className="w-10 h-10 border border-1 hover:shadow hover:shadow-orange-400 border-gray-300 hover:border-orange-400 rounded-4xl p-2 cursor-pointer  text-gray-300 hover:text-orange-400" />
                </div>
                <div >
                    <Phone className="w-10 h-10 border border-1 hover:shadow hover:shadow-orange-400 border-gray-300 hover:border-orange-400 rounded-4xl p-2 cursor-pointer  text-gray-300 hover:text-orange-400" />
                </div>
                <div  >
                    <Twitter className="w-10 h-10 border border-1 hover:shadow hover:shadow-orange-400 border-gray-300 hover:border-orange-400 rounded-4xl p-2 cursor-pointer  text-gray-300 hover:text-orange-400" />
                </div>
            </div>
        </div>
    )

}