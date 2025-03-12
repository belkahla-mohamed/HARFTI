import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ImageSlider({ images }) {
  const boxRef = useRef(null);
  const [user, setUser] = useState();
  const navigate = useNavigate('')
  const userID = JSON.parse(sessionStorage.getItem('userID'));
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
  useEffect(() => {
    gsap.to(boxRef.current, { opacity: 1, duration: 1 });
  }, []);

  function browseService() {
    Swal.fire({
      title: "Do you want to continue?",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "yes",
      cancelButtonText: "no",
      showCancelButton: true,
      showCloseButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        navigate('/Services')
      }
    });

  }

  function browseLogin() {
    Swal.fire({
      title: "Do you want to Log in?",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "yes",
      cancelButtonText: "no",
      showCancelButton: true,
      showCloseButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        navigate('/Register')
      }
    });

  }

  return (
    <div ref={boxRef} className="relative opacity-0">
      <Swiper
        direction="horizontal"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper h-[600px] mt-11 shadow-lg relative p-6 border-4 border-transparent rounded-lg"
      >
        {images.map((i, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={`./Images/bgs/${i}`}
                className="w-full h-[600px] object-cover"
                alt="Job and Design Background"
              />

              {/* Overlay with Message */}
              {userID ?
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">

                  {/* Welcome + Logo in One Line */}
                  <div className="flex items-center space-x-4">
                    <p className="text-white text-2xl sm:text-5xl font-bold">Welcome <span className="text-white hover:text-orange-500 transition-colors ease-in-out">{user?.username}</span></p>
                  </div>

                  <p className="text-white text-sm sm:text-2xl mt-2">
                    Need a professional? <br /> Browse services and find the perfect expert for the job!
                  </p>

                  <button onClick={browseService} className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                    Browser Now
                  </button>
                </div>
                :
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">

                  {/* Welcome + Logo in One Line */}
                  <div className="flex items-center space-x-4">
                    <p className="text-white text-2xl sm:text-5xl font-bold">Welcome to</p>
                    <img src="/logo/logo.png" className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]" alt="Company Logo" />
                  </div>

                  <p className="text-white text-sm sm:text-2xl mt-2">
                    Find trusted professionals for your needs.
                  </p>

                  <button onClick={browseLogin} className="mt-6 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                      Get Started
                  </button>
                </div>
              }
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Border Corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-lg"></div>
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-lg"></div>
        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-lg"></div>
        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-lg"></div>
      </div>
    </div>
  );
}
