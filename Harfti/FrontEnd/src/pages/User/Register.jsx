import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    MdOutlineDriveFileRenameOutline,
    MdOutlineAlternateEmail,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiPassword } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Form from "./to job/form";
import Swal from "sweetalert2";

export default function Register() {

    const navigate = useNavigate();
    useEffect(() => {
        const userID = sessionStorage.getItem('userID')
        if (userID) {
            navigate('/profile')
        }
    })

    const [active, setActive] = useState(true);
    const registerRef = useRef(null);
    const loginRef = useRef(null);
    const [role, setRole] = useState('user');
    const [user, setUser] = useState({
        fullname: '',
        username: '',
        age: '',
        photo: 'default.png',
        email: '',
        phone: '',
        password: '',
        role: role,
    });
    const [Success, setSuccess] = useState();
    const [Error, setError] = useState();
    const [registerErrors, setRegisterErrors] = useState({}); // Track registration form errors
    const [loginErrors, setLoginErrors] = useState({}); // Track login form errors
    const [yupError, setYupError] = useState();

    const formData = new FormData();
    const [selectedServices, setSelectedServices] = useState([]);

    const [auth, setAuth] = useState({
        email: '',
        password: '',
    });

    // Yup validation schema for registration
    const registerSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    // Yup validation schema for login
    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
        if (active) {
            tl.to(registerRef.current, { y: -20, opacity: 0 })
                .fromTo(loginRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
        } else {
            tl.to(loginRef.current, { y: -20, opacity: 0 })
                .fromTo(registerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });
        }
        setSuccess('');
        setError('');
    }, [active]);

    // Validate registration form fields on change
    const validateRegisterField = async (field, value) => {
        try {
            await registerSchema.validateAt(field, { [field]: value });
            setRegisterErrors((prev) => ({ ...prev, [field]: '' }));
        } catch (err) {
            setRegisterErrors((prev) => ({ ...prev, [field]: err.message }));
        }
    };

    // Validate login form fields on change
    const validateLoginField = async (field, value) => {
        try {
            await loginSchema.validateAt(field, { [field]: value });
            setLoginErrors((prev) => ({ ...prev, [field]: '' }));
        } catch (err) {
            setLoginErrors((prev) => ({ ...prev, [field]: err.message }));
        }
    };

    async function Add() {
        try {
            // Validate the user data against the schema
            await registerSchema.validate(user, { abortEarly: false });


            for (const [key, value] of Object.entries(user)) {
                formData.append(key, value);
            }

            if (selectedServices.length > 0) {
                selectedServices.forEach(service => {
                    formData.append("service[]", service); // Append each service separately
                });
            }            
            

            const res = await axios.post('http://localhost:3001/auth/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            if (res.data.status === "success") {
                setSuccess(res.data.message);
                setActive(true);
            } else {
                setError(res.data.message);
            }
        } catch (err) {

            if (err instanceof Yup.ValidationError) {


                // Handle validation errors
                const errors = {};
                err.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                setRegisterErrors(errors);


                // Collect all error messages into a single string

                /* Object.keys(yupError).forEach((e) => {
                    errors[e.path] = e.message;
                }); */
                Object.assign(errors, yupError);

                const errorMessages = Object.values(errors).join('<br>');
                // Display all errors in a Swal modal
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    html: errorMessages, // Use HTML to display line breaks
                });
            } else {
                console.log(err);
            }
        }
    }

    async function Login() {
        try {
            // Validate the auth data against the schema
            await loginSchema.validate(auth, { abortEarly: false });

            const res = await axios.post('http://localhost:3001/auth/login', auth);

            if (res.data.status === "success") {
                setSuccess(res.data.message);
                sessionStorage.setItem("userID", JSON.stringify(res.data.user._id));
                sessionStorage.setItem("role", JSON.stringify(res.data.user.role));
                navigate('/');
                window.location.reload();

            } else {
                setError(res.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: res.data.message
                })
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                // Handle validation errors
                const errors = {};
                err.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                setLoginErrors(errors);

                // Collect all error messages into a single string
                const errorMessages = Object.values(errors).join('<br>');

                // Display all errors in a Swal modal
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    html: errorMessages, // Use HTML to display line breaks
                });
            } else {
                setError("Error in login");
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: 'An error occurred during login. Please try again.',
                });
            }
        }
    }

    useEffect(() => {
        if (Success) {
            setError();
        } else if (Error) {
            setSuccess();
        }
    }, [Success, Error]);


    
    return (
        <div className="min-h-screen sm:pt-0 pt-5 flex justify-center items-center">
            {/* Register Section */}
            <div ref={registerRef} className={`flex px-5 flex-col-reverse sm:flex-row justify-center items-center ${active ? "hidden" : "flex"}`}>
                <div className={`flex bg-amber-600 shadow-2xl sm:h-[500px] ${role === 'user' ? 'sm:w-[450px]' : 'sm:w-[600px]'} w-full justify-center items-center rounded-l-lg px-5  flex-col`}>
                    <div>
                        <div className="flex flex-col justify-center items-center  gap-7">
                            <h1 className="font-extrabold pt-5 text-[#333333] text-4xl">Register</h1>
                            <div className={`${role === 'user' ? "" : 'grid sm:grid-cols-2 sm:gap-6 gap-6 '}`}>
                                <div className="grid grid-cols-1 gap-6 ">
                                    <InputField Icon={MdOutlineDriveFileRenameOutline} type="text" onChange={(e) => { setUser({ ...user, fullname: e.target.value }); validateRegisterField('fullname', e.target.value); }} placeholder="Fullname" />

                                    <InputField Icon={FaUserEdit} type="text" onChange={(e) => { setUser({ ...user, username: e.target.value }); validateRegisterField('username', e.target.value); }} placeholder="User Name" />

                                    <InputField Icon={MdOutlineAlternateEmail} type="email" onChange={(e) => { setUser({ ...user, email: e.target.value }); validateRegisterField('email', e.target.value); }} placeholder="Email" />

                                    <InputField Icon={PiPassword} type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }); validateRegisterField('password', e.target.value); }} placeholder="Password" />

                                    <div className={`${role === 'user' ? "w-full  flex items-center space-x-2 " : 'hidden'}`}> <input type="checkbox" name="" id="role" className="h-4 w-4" value='employee' onChange={(e) => { setRole(e.target.value); setUser({ ...user, role: e.target.value }) }} /><label htmlFor="role" className="" > Do you want to be an <span className="">employee ?</span>  </label>
                                    </div>

                                </div>
                                {role === 'employee' ? <Form setSelectedServices={setSelectedServices} selectedServices={selectedServices} setUser={setUser} setYupError={setYupError} user={user} /> : ''}
                            </div>
                            <button type="submit" onClick={Add} className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Register</button>
                        </div>
                    </div>
                    <MobileSwitch text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
                </div>
                <AuthImage text="Login" subtext="Do you already have an account?" onClick={() => setActive(true)} />
            </div>

            {/* Login Section */}
            <div ref={loginRef} className={`flex flex-col-reverse sm:flex-row justify-center items-center ${active ? "flex" : "hidden"}`}>
                <div className="flex bg-amber-600 shadow-2xl sm:h-[500px] sm:w-[450px] w-full justify-center items-center rounded-l-lg p-5 flex-col">
                    <div className="flex w-full max-w-[300px] justify-center items-center gap-8 flex-col">
                        <h1 className="font-extrabold text-[#333333] text-4xl">Login</h1>
                        <InputField Icon={FaUserEdit} type="text" placeholder="User Name or Email " onChange={(e) => { setAuth({ ...auth, email: e.target.value }); validateLoginField('email', e.target.value); }} />

                        <InputField Icon={PiPassword} type="password" placeholder="Password" onChange={(e) => { setAuth({ ...auth, password: e.target.value }); validateLoginField('password', e.target.value); }} />

                        <button type="submit" onClick={Login} className="w-full py-2 bg-[#333333] text-white text-xl rounded-md hover:bg-[#1f1e1e]">Login</button>

                    </div>
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
        <input className="py-2 w-full  pr-5 outline-none" type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
);

// Mobile Switch Component
const MobileSwitch = ({ text, subtext, onClick }) => (
    <div className="sm:hidden p-5">
        <button className=" text-xl font-bold mb-1" onClick={onClick}>{text}</button>
        <h2 className="text-sm text-[17px] pb-5 ">{subtext}</h2>
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