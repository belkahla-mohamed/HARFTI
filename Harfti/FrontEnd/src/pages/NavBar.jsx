import { useEffect, useRef, useState } from "react";
import { Search, UserPlus, House, Facebook, Briefcase, Instagram, Phone, Twitter, Menu, CircleX, CircleUserRound, Handshake } from 'lucide-react';
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";



export default function Navbar() {

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const userID = JSON.parse(sessionStorage.getItem('userID'));

  const boxRef1 = useRef(null)
  const boxRef = useRef(null)
  const boxRefs = useRef([]);

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

      <div ref={boxRef1} className="w-full h-full -translate-x-32 bg-[#333333] px-4 sm:px-[7em] text-[25px] sm:text-[40px]  flex justify-between opacity-0 items-center shadow-[0_5px_10px_rgba(0,0,0,0.3)]">
        <Link to='/'><img src="/logo/logo.png" className="w-32 h-[90px]" /></Link>

        <div className="w-[5%] ">

          {userID ?
            <button className="sm:block hidden">
              <Link to="/Profile">
                <CircleUserRound className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </Link>
            </button>
            :
            <button>
              <Link to="/Register">
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </Link>
            </button>
          }

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

          <ul className=" w-full flex justify-between">
            <li>
              <Link to="/"><House className={`${location.pathname === "/" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            <li>
              <Link to="/Services"><Handshake className={`${location.pathname === "/Services" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            <li>
              <Link to="/Worker" ><Briefcase className={`${location.pathname === "/Worker" ? "text-white" : 'text-[#333333]'} hover:text-blue-950 w-8 h-8 cursor-pointer`} /></Link>
            </li>
            <li>
              {userID ?
                
                  <Link to="/Profile">
                    <CircleUserRound className={`hover:text-blue-950 w-8 h-8 cursor-pointer ${location.pathname === "/Profile" ? "text-white" : 'text-[#333333]'} `} />
                  </Link>
              
                :
           
                  <Link to="/Register">
                    <UserPlus className={`hover:text-blue-950 w-8 h-8 cursor-pointer ${location.pathname === "/Register" ? "text-white" : 'text-[#333333]'} `} />
                  </Link>
                
              }
            </li>
          </ul>

        </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
