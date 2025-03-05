import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowRight } from 'lucide-react';
import gsap from "gsap";
import { Link } from "react-router-dom";

const MyMap = () => {
  const [location, setLocation] = useState({ lat: 33.5731, lng: -7.5898 }); // Default to Casablanca
  const [isHovered, setIsHovered] = useState(false);
  const refBtn = useRef();
  const refMap = useRef();
  const refTitle = useRef();

  const userID = JSON.parse(sessionStorage.getItem('userID'));

  useEffect(() => {
    gsap.from(refBtn.current, { x: -7000, duration: 1, opacity: 0 });
    gsap.from(refMap.current, { x: 7000, duration: 1, opacity: 0 });
    gsap.from(refTitle.current, { y: -100, duration: 1, opacity: 0 });
  }, []);



  // Handle click event on map
  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setLocation(newLocation); // Update location in state
  };

  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(location));
  }, [location])


  // Handle mouse hover effect for the button
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      {
        userID ?
          <div className="min-h-screen w-full flex flex-col  items-center select-none">
            < div ref={refTitle} className="flex items-center" >
              <h1 className="text-center 2xl:text-6xl sm:text-4xl text-2xl font-extrabold text-orange-500 cursor-default">Select Location</h1>
              <DotLottieReact
                src="https://lottie.host/a8206a0e-2bef-44b0-a0c7-b08b0d3ebe02/qowoK7DEJH.lottie"
                loop
                autoplay
                className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              />
            </div >
            <div className="w-full justify-center sm:px-0 px-2 ">
              <div ref={refMap}>
                <LoadScript googleMapsApiKey="AIzaSyCYwPU9XysKPzK6yWHnWX2mtETR3DLZXAY">
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    center={location}
                    zoom={10}
                    onClick={handleMapClick}
                  >
                    <Marker position={location} />
                  </GoogleMap>
                </LoadScript>
              </div>

              <div ref={refBtn} className=" w-[100%] flex-col items-end flex justify-center  text-center">


                <Link to="/Problem">
                  <button

                    className={`mt-4 px-6 py-2 text-white font-semibold rounded-md flex items-center gap-x-2 transition-all duration-300 ${isHovered
                      ? "bg-orange-700"
                      : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}

                  >
                    Next <ArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div >
          :
          <div className="min-h-screen w-full flex flex-col items-center select-none">
            <DotLottieReact
              src="https://lottie.host/2c820322-a133-4e82-9d0a-7523f69b74aa/llgDL6WXjx.lottie"
              loop
              autoplay
              className="sm:w-[400px] sm:h-[400px] w-[200px] h-[200px]"
            />

            <p className="text-center text-red-500 font-bold text-xl sm:text-2xl">You need to login first.</p>
            <p className="text-center text-sm sm:text-xl text-gray-500">You must log in to reserve a worker and access your information.</p>
            <a className="text-center underline text-md font-bold" href="/Register">Go back to Login</a>
          </div>
      }
    </>



  );
};

export default MyMap;
