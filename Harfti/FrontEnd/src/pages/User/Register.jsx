import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    MdOutlineDriveFileRenameOutline,
    MdDriveFileRenameOutline,
    MdOutlineAlternateEmail,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function Register() {
    const [active, setActive] = useState(true);
    const registerRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
        if (active) {
            tl.to(registerRef.current, { y: -20, opacity: 0 })
                .fromTo(loginRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
        } else {
            tl.to(loginRef.current, { y: -20, opacity: 0 })
                .fromTo(registerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
        }
        setSuccess('')
        setError('')
    }, [active]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Image = "default.png"

    const [Success, setSuccess] = useState();
    const [Error, setError] = useState();





    // const [mess, setMess] = useState();
    const navigate = useNavigate()

    function Add(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/create', { firstName, lastName, username, email, password, image: Image })
            .then((res) => {
                if (res.data.status === "success") {
                    setSuccess(res.data.message)
                    setEmail('')
                    setFirstName('')
                    setLastName('')
                    setPassword('')
                    setUsername('')
                    setActive(true)

                } else {
                    setError(res.data.message)
                }
            })
            .catch((err) =>
                console.log(err)
            )


    }
    useEffect(() => {
        setSuccess('')
        setError('')
    }, [])

    function Login(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/login', { username, password })
            .then((res) => {
                if (res.data.status === "success") {
                    setSuccess(res.data.message);

                    // ✅ Store user data in sessionStorage
                    sessionStorage.setItem("userID", JSON.stringify(res.data.user._id));

                    navigate('/');
                } else {
                    setError(res.data.message);
                }
            })
            .catch((error) => {
                setError({ message: "Error in login", error });
            });
    }
    useEffect(() => {
        if (Success) {
            setError();
        } else if (Error) {
            setSuccess()
        }
    }, [Success, Error])




    return (
        <div className="min-h-screen flex justify-center items-center">
            {/* Register Section */}
            <div ref={registerRef} className={`flex flex-col-reverse sm:flex-row justify-center items-center ${active ? "hidden" : "flex"}`}>
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form onSubmit={Add} className="flex w-full max-w-[300px] justify-center items-center gap-4 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Register</h1>
                        <InputField Icon={MdOutlineDriveFileRenameOutline} type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                        <InputField Icon={MdDriveFileRenameOutline} type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                        <InputField Icon={FaUserEdit} type="text" onChange={(e) => setUsername(e.target.value)} placeholder="User Name" />
                        <InputField Icon={MdOutlineAlternateEmail} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <InputField Icon={PiPassword} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit" className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Register</button>
                        {Success && <p className="text-center font-bold text-green-600">{Success}</p>}
                        {Error && <p className="text-center font-bold text-red-600">{Error}</p>}

                    </form>
                    <MobileSwitch text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
                </div>
                <AuthImage text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
            </div>

            {/* Login Section */}
            <div ref={loginRef} className={`flex flex-col-reverse sm:flex-row justify-center items-center ${active ? "flex" : "hidden"}`}>
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <form onSubmit={Login} className="flex w-full max-w-[300px] justify-center items-center gap-8 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Login</h1>

                        <InputField Icon={FaUserEdit} type="text" placeholder="User Name or Email " onChange={(e) => setUsername(e.target.value)} />
                        <InputField Icon={PiPassword} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Login</button>
                        {Success && <p className="text-center font-bold text-green-600">{Success}</p>}
                        {Error && <p className="text-center font-bold text-red-600">{Error}</p>}
                    </form>
                    <MobileSwitch text="Register" subtext="Don't have an account already?" onClick={() => setActive(false)} />
                </div>
                <AuthImage text="Register" subtext="Don't have an account already?" onClick={() => setActive(false)} />
            </div>
        </div>
    );
}

// Input Field Component
const InputField = ({ Icon, type, placeholder, value, onChange }) => (
    <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
        <Icon className="w-6 h-6" />
        <input className="py-2 w-full pr-5 outline-none" type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);

// Mobile Switch Component
const MobileSwitch = ({ text, subtext, onClick }) => (
    <div className="sm:hidden p-5">
        <button className="text-white text-lg font-bold mb-3" onClick={onClick}>{text}</button>
        <h2 className="text-sm text-white">{subtext}</h2>
    </div>
);

// Auth Image Component
const AuthImage = ({ text, subtext, onClick }) => (
    <div className="hidden sm:flex flex-col bg-[#333333] shadow-2xl sm:h-[500px] sm:w-[200px] w-full justify-center items-center text-center rounded-r-lg">
        <img src="/test.jpg" className="w-full h-full object-cover rounded-t-lg" alt={text} />
        <div className="p-5 absolute top-15">
            <button className="text-white text-lg font-bold mb-3" onClick={onClick}>{text}</button>
            <h2 className="text-sm text-white">{subtext}</h2>
        </div>
    </div>
);
