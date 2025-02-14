import { Anvil, Axe, BrickWall, Briefcase, Circle, Flame, Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench } from "lucide-react"
import React from "react"

export default function Services() {
    const icons = "w-20 h-20 text-white "
    const title = "text-center text-white font-bold hover:drop-shadow-[0_0_10px_white] drop-shadow-[0_2px_0px_#333333]  cursor-default duration-100 ease-in-out"
    return (
        <div className="min-h-screen w-full flex flex-col gap-10 justify-center items-center select-none">
            <h1 className="text-start sm:text-6xl text-5xl font-extrabold text-orange-500 cursor-default">Our Services</h1>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-12 2xl:gap-36  p-10 ">
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Package className={icons} /></p>
                    <p className={title}>Delivery Person</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Axe className={icons} /></p>
                    <p className={title}>Carpenter</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Anvil className={icons} /></p>
                    <p className={title}>Blacksmith </p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Wrench className={icons} /></p>
                    <p className={title}>Mechanic</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Gem className={icons} /></p>
                    <p className={title}>Goldsmith </p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><BrickWall className={icons} /></p>
                    <p className={title}>Builder</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><ScissorsLineDashed className={icons} /></p>
                    <p className={title}>Tailor</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Palette className={icons} /></p>
                    <p className={title}>Craftsperson</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Briefcase className={icons} /></p>
                    <p className={title}>Leatherworker</p>
                </div>
                <div className="flex flex-col w-full h-full items-center justify-center bg-orange-500 hover:bg-[#333333] rounded duration-300 ease-in-out py-4">
                    <p><Flame className={icons} /></p>
                    <p className={title}>Welder</p>
                </div>
            </div>
        </div>
    )
}