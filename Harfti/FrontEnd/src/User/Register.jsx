import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    MdOutlineDriveFileRenameOutline,
    MdDriveFileRenameOutline,
    MdOutlineAlternateEmail,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";

export default function Register() {
    const [active, setActive] = useState(false);
    const registerRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

        if (active) {
            tl.to(registerRef.current, { y: -20, opacity: 0, display: "none" })
              .fromTo(loginRef.current, { y: 20, opacity: 0, display: "flex" }, { y: 0, opacity: 1 });
        } else {
            tl.to(loginRef.current, { y: -20, opacity: 0, display: "none" })
              .fromTo(registerRef.current, { y: 20, opacity: 0, display: "flex" }, { y: 0, opacity: 1 });
        }
    }, [active]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            {/* Register Section */}
            <div ref={registerRef} className={`flex flex-col-reverse sm:flex-row justify-center items-center ${active ? "hidden" : "flex"}`}>
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form className="flex w-full max-w-[300px] justify-center items-center gap-4 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Register</h1>
                        <InputField Icon={MdOutlineDriveFileRenameOutline} type="text" placeholder="First Name" />
                        <InputField Icon={MdDriveFileRenameOutline} type="text" placeholder="Last Name" />
                        <InputField Icon={FaUserEdit} type="text" placeholder="User Name" />
                        <InputField Icon={MdOutlineAlternateEmail} type="email" placeholder="Email" />
                        <InputField Icon={PiPassword} type="password" placeholder="Password" />
                        <button className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Register</button>
                    </form>
                    <MobileSwitch text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
                </div>
                <AuthImage text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
            </div>

            {/* Login Section */}
            <div ref={loginRef} className={`flex flex-col-reverse sm:flex-row justify-center items-center ${active ? "flex" : "hidden"}`}>
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form className="flex w-full max-w-[300px] justify-center items-center gap-8 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Login</h1>
                        <InputField Icon={MdOutlineAlternateEmail} type="email" placeholder="Email" />
                        <InputField Icon={PiPassword} type="password" placeholder="Password" />
                        <button className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Login</button>
                    </form>
                    <MobileSwitch text="Register" subtext="Don't have an account already?" onClick={() => setActive(false)} />
                </div>
                <AuthImage text="Register" subtext="Don't have an account already?" onClick={() => setActive(false)} />
            </div>
        </div>
    );
}

const InputField = ({ Icon, type, placeholder }) => (
    <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
        <Icon className="w-6 h-6" />
        <input className="py-2 w-full pr-5 outline-none" type={type} placeholder={placeholder} />
    </div>
);

const MobileSwitch = ({ text, subtext, onClick }) => (
    <div className="sm:hidden p-5">
        <button className="text-white text-lg font-bold mb-3" onClick={onClick}>{text}</button>
        <h2 className="text-sm text-white">{subtext}</h2>
    </div>
);

const AuthImage = ({ text, subtext, onClick }) => (
    <div className="hidden sm:flex flex-col bg-[#333333] shadow-2xl sm:h-[500px] sm:w-[200px] w-full justify-center items-center text-center rounded-r-lg">
        <img src="/test.jpg" className="w-full h-full object-cover rounded-t-lg" alt={text} />
        <div className="p-5 absolute top-15">
            <button className="text-white text-lg font-bold mb-3" onClick={onClick}>{text}</button>
            <h2 className="text-sm text-white">{subtext}</h2>
        </div>
    </div>
);