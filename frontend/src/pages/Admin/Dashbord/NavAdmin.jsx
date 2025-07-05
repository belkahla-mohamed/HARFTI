import { AlignJustify, ArrowRight, Briefcase, CircleUserRound, CircleX, HandPlatter, LayoutGrid, LogOut, Logs, ScrollText, User, UsersRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function NavAdmin() {
    const [user, setUser] = useState();
    const [x, setX] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const userID = JSON.parse(sessionStorage.getItem('userID'));
    const folder = user && user.photo.startsWith('avatar') ? 'uploads' : 'EmployeePhotos'
    useEffect(() => {
        if (userID) {
            axios.post('https://harftibackend-production.up.railway.app/user/Profile', { userID })
                .then((res) => {
                    if (res.data.status === "success") {
                        setUser(res.data.user)

                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    function Logout() {
        Swal.fire({
          title: "Are You sure?",
          text: "You will be logged out!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#333333',
          cancelButtonColor: "red",
          confirmButtonText: 'Yes, Logout!'
        }).then((res) => {
          if (res.isConfirmed) {
            sessionStorage.removeItem("userID")
            sessionStorage.removeItem('role')
            setShow(false)
            navigate('/Register')
          }
        })
    
      }

    return (
        <div className="relative z-[99]">
            {/* Header */}
            <motion.div
                className="w-full flex items-center fixed justify-between shadow-md  bg-neutral-200 h-20 px-8   z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h1 className="text-xl font-bold">
                    <img src="/logo/logo.png" className="w-32 h-[90px]" alt="Logo" />
                </h1>
                <div className="flex gap-4">

                    <button onMouseEnter={() => setShow(true)} onClick={() => setShow(!show)} className="relative sm:block hidden">

                        {user && user.photo ? (
                            <img src={`https://harftibackend-production.up.railway.app/${folder}/${user.photo}`} alt="User Profile" className={`w-[50px] border ${location.pathname === "/Profile" ? "border-orange-500" : "border-white"} border-2 rounded-[50%] h-[50px]`} />
                        ) : (
                            <CircleUserRound className={`w-[50px] h-[50px] ${location.pathname === "/Profile" ? "text-orange-500" : "text-white"}`} /> // Fallback icon
                        )}

                    </button>
                    {show && user &&
                        <div onMouseLeave={() => setShow(false)} className="hidden sm:block absolute p-4 translate-y-14 -translate-x-38 rounded-2xl  space-y-2 bg-gray-300">

                            <h1 className="text-center font-bold uppercase text-2xl">{user.username}</h1>
                            <div className="w-full">
                                <Link to={`/Profile/${userID}`}>
                                    <div className="flex py-2 justify-around w-full gap-x-4 cursor-pointer ease-in-out duration-1 px-4 hover:bg-gray-400 items-center ">
                                        <User />
                                        <div className="flex w-full gap-x-4 items-center ">
                                            <p className="text-lg">My profile</p>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>

                                <div onClick={Logout} className="flex py-2  justify-around w-full gap-x-4 cursor-pointer px-4 text-red-600 hover:bg-red-300 items-center ">
                                    <LogOut />
                                    <div className="flex w-full gap-x-10 items-center ">
                                        <p className="text-lg">Logout</p>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>


                        </div>}
                    <span className="sm:hidden" onClick={() => setX(!x)}>
                        <AnimatePresence mode="wait" initial={false}>
                            {x ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AlignJustify />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Logs />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </span>
                </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
                initial={{ x: -250, opacity: 0 }} // Start hidden to the left
                animate={{ x: 0, opacity: 1 }} // Slide in smoothly
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth effect
                className="h-[calc(100vh-80px)] sm:block hidden top-20 left-0 fixed  overflow-y-auto bg-neutral-300 shadow-md"
            >
                <ul className="h-full w-full flex flex-col justify-start pt-10 space-y-8">
                    <Link to='/'>
                        <li className="flex px-4 py-3 gap-2 items-center cursor-pointer hover:text-slate-500 hover:rounded-l-2xl hover:bg-slate-100 transition-all text-lg">
                            <LayoutGrid /> <span>Dashboard</span>
                        </li>
                    </Link>
                    <Link to='/dashUser'>
                        <li className="flex px-4 py-3 gap-2 items-center cursor-pointer hover:text-slate-500 hover:rounded-l-2xl hover:bg-slate-100 transition-all text-lg">
                            <UsersRound /> <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/dashService'>
                        <li className="flex px-4 py-3 gap-2 items-center cursor-pointer hover:text-slate-500 hover:rounded-l-2xl hover:bg-slate-100 transition-all text-lg">
                            <HandPlatter /> <span>Services</span>
                        </li>
                    </Link>
                    <Link to='/dashEmployee'>
                        <li className="flex px-4 py-3 gap-2 items-center cursor-pointer hover:text-slate-500 hover:rounded-l-2xl hover:bg-slate-100 transition-all text-lg">
                            <Briefcase /> <span>Employees</span>
                        </li>
                    </Link>
                    <Link to='/dashReservation'>
                        <li className="flex px-4 py-3 gap-2 items-center cursor-pointer hover:text-slate-500 hover:rounded-l-2xl hover:bg-slate-100 transition-all text-lg">
                            <ScrollText /> <span>Reservations</span>
                        </li>
                    </Link>
                </ul>
            </motion.div>


            {/* Bottom Navbar for Mobile */}
            <AnimatePresence mode="wait" initial={false}>
                {!x && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full z-50 fixed h-16 sm:hidden block bottom-0 bg-neutral-200"
                    >
                        <div className="flex w-full h-full transition-colors justify-around items-center">
                            <Link to='/'><LayoutGrid className="hover:text-slate-500" /></Link>
                            <Link to='/dashUser'><UsersRound className="hover:text-slate-500" /></Link>
                            <Link to='/dashService'><HandPlatter className="hover:text-slate-500" /></Link>
                            <Link to='/dashEmployee'><Briefcase className="hover:text-slate-500" /></Link>
                            <Link to='/dashReservation'><ScrollText className="hover:text-slate-500" /></Link>
                            <span onClick={() => setX(!x)}>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key="close-bottom"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CircleX />
                                    </motion.div>
                                </AnimatePresence>
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
