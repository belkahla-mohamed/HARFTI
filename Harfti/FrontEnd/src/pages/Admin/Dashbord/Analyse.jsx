import { ArrowUp, BriefcaseBusiness, DollarSign, ScrollText, UsersRound } from "lucide-react";

import PolarAreaChart from "./Plan";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CountUp from 'react-countup';

export default function Analyse() {
    return (
        <div className="  w-full sm:ml-10 sm:px-0 px-7 sm:mb-0 mb-15 flex h-screen items-center justify-center">
            <div className="w-[70%] flex gap-7 sm:mt-0 mt-20    justify-around ">
                <div className="grid sm:grid-rows-2  w-full  gap-5">
                    <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-2">
                        {/* USERS CARD */}
                        <div className="bg-neutral-300 rounded-2xl flex flex-col justify-between shadow hover:shadow-md transition-all p-4">
                            <div className="w-full flex justify-between px-2">
                                <h1 className="text-2xl">User</h1>
                                <UsersRound />
                            </div>
                            <h1 className="text-black font-bold px-2 text-3xl hover:scale-110 cursor-pointer transition-transform duration-300">
                                <CountUp end={2000} duration={2} separator="," />
                            </h1>
                            <div className="flex pl-2 text-green-500">
                                <ArrowUp />
                                <p className="px-0.5">
                                    <CountUp end={8.2} decimals={1} duration={2} />%
                                </p>
                                <p className="text-slate-500 text-xs pl-2 flex items-center">Member, use this platform.</p>
                            </div>
                        </div>

                        {/* EMPLOYEES CARD */}
                        <div className="bg-neutral-300 rounded-2xl flex flex-col justify-between shadow hover:shadow-md transition-all p-4">
                            <div className="w-full flex justify-between px-2">
                                <h1 className="text-2xl">Employees</h1>
                                <BriefcaseBusiness />
                            </div>
                            <h1 className="text-black font-bold px-2 text-3xl hover:scale-110 cursor-pointer transition-transform duration-300">
                                <CountUp end={1000} duration={2} separator="," />
                            </h1>
                            <div className="flex pl-2 text-green-500">
                                <ArrowUp />
                                <p className="px-0.5">
                                    <CountUp end={3.2} decimals={1} duration={2} />%
                                </p>
                                <p className="text-slate-500 text-xs pl-2 flex items-center">Employees, use this platform.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                        {/* RESERVATION CARD */}
                        <div className="bg-neutral-300 rounded-2xl flex flex-col justify-between shadow hover:shadow-md transition-all p-4">
                            <div className="w-full flex justify-between px-2">
                                <h1 className="text-2xl">Reservation</h1>
                                <ScrollText />
                            </div>
                            <h1 className="text-black font-bold px-2 text-3xl cursor-pointer hover:scale-110 transition-transform duration-300">
                                <CountUp end={500} duration={2} separator="," />
                            </h1>
                            <div className="flex pl-2 text-green-500">
                                <ArrowUp />
                                <p className="px-0.5">
                                    <CountUp end={5.5} decimals={1} duration={2} />%
                                </p>
                                <p className="text-slate-500 text-xs pl-2 flex items-center">
                                    The total number of reservations made by users on this platform.
                                </p>
                            </div>
                        </div>

                        {/* REVENUE CARD */}
                        <div className="bg-neutral-300 rounded-2xl flex flex-col justify-between shadow hover:shadow-md transition-all p-4">
                            <div className="w-full flex justify-between px-2">
                                <h1 className="text-2xl">Revenue</h1>
                                <DollarSign />
                            </div>
                            <h1 className="text-black font-bold px-2 text-3xl cursor-pointer hover:scale-110 transition-transform duration-300">
                                $<CountUp end={250000} duration={2} separator="," />
                            </h1>
                            <div className="flex pl-2 text-green-500">
                                <ArrowUp />
                                <p className="px-0.5">
                                    <CountUp end={12.5} decimals={1} duration={2} />%
                                </p>
                                <p className="text-slate-500 text-xs pl-2 flex items-center">Total revenue generated this year.</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="grid w-full gap-5 sm:grid hidden  grid-cols-2  ">
                    <div className="bg-neutral-300 rounded-2xl  sm:block hidden justify-center items-center shadow-md  "><PolarAreaChart /></div>
                    <div className="bg-neutral-300 rounded-2xl flex justify-center items-center shadow-md">
                        <DotLottieReact
                            src="https://lottie.host/f20c73ce-8852-4ebf-8845-7c05ae7ea806/ZKblxEqo4N.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}