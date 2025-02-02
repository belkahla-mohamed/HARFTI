import  { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    MdOutlineDriveFileRenameOutline,
    MdDriveFileRenameOutline,
    MdOutlineAlternateEmail,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";

export default function Register() {
    const [active, setActive] = useState(false); // Gère l'état de la vue active
    const registerRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        if (active) {
            // Transition vers Login
            gsap.to(registerRef.current, {
                y: -50,
                autoAlpha: 0,
                duration: 0.1,
                onComplete: () => {
                    gsap.fromTo(
                        loginRef.current,
                        { y: 50, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.5 }
                    );
                },
            });
        } else {
            // Transition vers Register
            gsap.to(loginRef.current, {
                y: -50,
                autoAlpha: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.fromTo(
                        registerRef.current,
                        { y: 50, autoAlpha: 0 },
                        { y: 0, autoAlpha: 1, duration: 0.5 }
                    );
                },
            });
        }
    }, [active]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            {/* Section Register */}
            <div
                ref={registerRef}
                className={`flex flex-col-reverse sm:flex-row justify-center items-center transition-opacity ${
                    active ? "hidden" : "flex"
                }`}
            >
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] h-auto sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form className="flex w-full max-w-[300px] justify-center items-center gap-4 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Register</h1>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <MdOutlineDriveFileRenameOutline className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="text"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <MdDriveFileRenameOutline className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <FaUserEdit className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="text"
                                placeholder="User Name"
                            />
                        </div>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <MdOutlineAlternateEmail className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <PiPassword className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e] focus:ring-2 focus:outline-none"
                        >
                            Register
                        </button>
                    </form>

                    <div className="sm:hidden p-5 top-15">
                        <button
                            className="text-white text-lg font-bold mb-3"
                            onClick={() => setActive(true)}
                        >
                            Login<h2 className="text-sm text-white">
                            Do you already <br /> have an account?
                        </h2>
                        </button>
                        
                    </div>



                </div>
                <div className="hidden sm:flex flex-col bg-[#333333] shadow-2xl sm:h-[500px] h-auto sm:w-[200px] w-full justify-center items-center text-center rounded-r-lg">
                    <img
                        src="/test.jpg"
                        className="w-full h-full relative object-cover rounded-t-lg"
                        alt="Register"
                    />
                    <div className="p-5 absolute top-15">
                        <button
                            className="text-white text-lg font-bold mb-3"
                            onClick={() => setActive(true)}
                        >
                            Login
                        </button>
                        <h2 className="text-sm text-white">
                            Do you already <br /> have an account?
                        </h2>
                    </div>
                </div>
            </div>

            {/* Section Login */}
            <div
                ref={loginRef}
                className={`flex flex-col-reverse sm:flex-row justify-center items-center transition-opacity ${
                    active ? "flex" : "hidden"
                }`}
            >
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] h-auto sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form className="flex w-full max-w-[300px] justify-center items-center gap-8  flex-col">
                        <h1 className="font-extrabold text-[#333333]  text-4xl">Login</h1>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <MdOutlineAlternateEmail className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                            <PiPassword className="w-6 h-6" />
                            <input
                                className="py-2 w-full pr-5 outline-none"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e] focus:ring-2 focus:outline-none"
                        >
                            Login
                        </button>
                    </form>



                    <div className="sm:hidden p-5 top-15">
                        <button
                            className="text-white text-lg font-bold mb-3"
                            onClick={() => setActive(false)}
                        >
                            Register<h2 className="text-sm text-white"> Don't have <br /> an account already?
                        </h2>
                        </button>
                        
                    </div>



                </div>
                <div className="hidden sm:flex flex-col bg-[#333333] shadow-2xl sm:h-[500px]  sm:w-[200px] w-full justify-center items-center text-center rounded-r-lg">
                    <img
                        src="/test.jpg"
                        className="w-full h-full object-cover relative rounded-t-lg"
                        alt="Login"
                    />
                    <div className="p-5 absolute top-15 ">
                        <button
                            className="text-white text-lg font-bold mb-3"
                            onClick={() => setActive(false)}
                        >
                            Register
                        </button>
                        <h2 className="text-sm text-white"> Don't have <br /> an account already?
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
