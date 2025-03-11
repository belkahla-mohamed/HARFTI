import { useEffect, useRef, useState } from "react";
import { UserPlus, House, Facebook, Briefcase, Instagram, Phone, Twitter, Menu, CircleX, CircleUserRound, Handshake, User, ArrowBigLeft, ArrowRight, LogOut, CirclePlus } from 'lucide-react';
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Swal from 'sweetalert2';



export default function Navbar() {
  const [user, setUser] = useState();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const userID = JSON.parse(sessionStorage.getItem('userID'));
  const role = JSON.parse(sessionStorage.getItem('role'));
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const boxRef1 = useRef(null)
  const boxRef = useRef(null)
  const boxRefs = useRef([]);
  const avatar = localStorage.getItem('avatar');

  useEffect(() => {
    if (userID) {
      axios.post('http://127.0.0.1:3001/user/Profile', { userID })
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

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {

    gsap.to(boxRef1.current, { x: 0, duration: 1, opacity: 1 });
    gsap.to(boxRef.current, { y: 0, duration: 1, opacity: 1 });
  }, []);

  useEffect(() => {

    gsap.from(boxRefs.current, {
      opacity: 0,
      y: -50,
      stagger: 0.3,
      duration: 1,

    });
  }, []);

  const folder = user && user.photo.startsWith('avatar') ? 'uploads' : 'EmployeePhotos'

  return (
    <div>
      <ToastContainer />
      <div className="w-full flex  justify-center sm:space-x-20 space-x-10 p-2">

        <div ref={(el) => (boxRefs.current[0] = el)} className="border border-4 border-blue-800 rounded-4xl p-2 cursor-pointer">
          <Facebook className="stroke-3 text-blue-800" />
        </div>
        <div ref={(el) => (boxRefs.current[1] = el)} className="border border-4 border-pink-800 rounded-4xl p-2 cursor-pointer">
          <Instagram className="stroke-3 text-pink-800" />
        </div>
        <div ref={(el) => (boxRefs.current[2] = el)} className="border border-4 border-green-800 rounded-4xl p-2 cursor-pointer">
          <Phone className="stroke-3 text-green-800" />
        </div>
        <div ref={(el) => (boxRefs.current[3] = el)} className="border border-4 border-blue-400 rounded-4xl p-2 cursor-pointer" >
          <Twitter className="stroke-3 text-blue-400" />
        </div>
      </div>

      <div ref={boxRef1} className="w-full h-full -translate-x-32 bg-[#333333] pl-4 sm:pl-[7em] pr-4 sm:pr-[3em] text-[25px] sm:text-[40px]  flex justify-between opacity-0 items-center shadow-[0_5px_10px_rgba(0,0,0,0.3)]">

        <Link to='/'><img src="/logo/logo.png" className="w-32 h-[90px]" /></Link>


        <div className={`${role === "employee" ? "w-[10%] flex items-center justify-between" : "w-[5%]"}`}>

          {role === "employee" ? <CirclePlus className="hidden sm:block stroke-1 w-[55px] h-[55px] text-white" /> : ""}
          <div>
            {userID ? (
              <button onMouseEnter={() => setShow(true)} onClick={() => setShow(!show)} className="relative sm:block hidden">

                {user && user.photo ? (
                  <img src={`http://localhost:3001/${folder}/${user.photo}`} alt="User Profile" className="w-[50px] border border-white border-2 rounded-[50%] h-[50px]" />
                ) : (
                  <CircleUserRound className="w-[50px] h-[50px] text-white" /> // Fallback icon
                )}

              </button>
            ) : (
              <button className="hidden sm:block">
                <Link to="/Register">
                  <UserPlus className="w-[50px] h-[50px] text-white" />
                </Link>
              </button>
            )}

            {show && user &&
              <div onMouseLeave={() => setShow(false)} className="hidden sm:block absolute p-4 translate-y-4 -translate-x-16 rounded-2xl  space-y-2 bg-gray-300">

                <h1 className="text-center font-bold uppercase text-2xl">{user.username}</h1>
                <div className="w-full">
                  <Link to="/Profile">
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

            {/* menu icon */}
            <button className="sm:hidden" onClick={() => { setOpen(!open) }}>
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="circleX"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CircleX className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            {/* menu icon */}
          </div>


        </div>
      </div>


      <div ref={boxRef}
        className={`hidden sm:flex items-center -translate-y-full h-full fixed left-0 z-50 top-0 bg-orange-400 sm:px-8 py-[10em] shadow-[5px_0_10px_rgba(0,0,0,0.3)]`}
      >
        <ul className="h-full w-full flex flex-col justify-between space-y-8">
          <li>
            <Link to="/">
              <House className={`${location.pathname === "/" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} />
            </Link>
          </li>
          <li>
            <Link to="/Services" >
              <Handshake className={`${location.pathname === "/Services" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} />
            </Link>
          </li>
          <li>
            <Link to="/Worker" >
              <Briefcase className={`${location.pathname === "/Worker" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} />
            </Link>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {open && <motion.div
          initial={{ translateY: "100%" }}
          animate={{ translateY: "0" }}
          exit={{ translateY: "100%" }}
          transition={{ duration: 0.6 }}
          className={`${open ? " px-5 fixed" : "hidden"}  items-center left-0 bottom-0 right-0 z-50  bg-orange-400 sm:px-8 py-[1em] shadow-[5px_0_10px_rgba(0,0,0,0.3)]`}>

          <ul className=" w-full flex items-center justify-between">
            <li>
              <Link to="/"><House className={`${location.pathname === "/" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            <li>
              <Link to="/Services"><Handshake className={`${location.pathname === "/Services" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            {role === "employe" &&
              <li>
                <Link to="/AddPost"><CirclePlus className={`${location.pathname === "/AddPost" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-[50px] h-[50px] cursor-pointer`} /></Link>
              </li>}

            <li>
              <Link to="/Worker" ><Briefcase className={`${location.pathname === "/Worker" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            {userID ? (

              <li>
                {user && user.photo ? (
                  <Link to="/Profile">
                    <img src={`http://localhost:3001/${folder}/${user.photo}`} alt="User Profile" className={`w-8 h-8 border-2 rounded-2xl  ${location.pathname === "/Profile" ? "border-white" : 'border-[#333333]'}`} />
                  </Link>
                ) : (
                  <Link to="/Profile">
                    <CircleUserRound className={`hover:text-blue-950 w-8 h-8 cursor-pointer ${location.pathname === "/Profile" ? "text-white" : 'text-[#333333]'} `} />
                  </Link>
                )}</li>


            ) : (
              <li>
                <Link to="/Register">
                  <UserPlus className={`hover:text-blue-950 w-8 h-8 cursor-pointer ${location.pathname === "/Register" ? "text-white" : 'text-[#333333]'} `} />
                </Link>

              </li>)}

          </ul>

        </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
