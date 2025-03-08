import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { Link } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);

export default function Services({ workers }) {
  const cardsRef = useRef([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/services')
      .then((res) => {
        if (res.data.status === "success") {
          setServices(res.data.services);
          setMessage(res.data.message);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50, // تحريك للأعلى
      stagger: 4, // تأخير 0.3 ثانية بين كل بطاقة وأخرى
      duration: 1,

      scrollTrigger: {
        trigger: ".cards-container",
        start: "top 85%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="cards-container w-full h-auto flex flex-wrap justify-center gap-4 px-5 sm:px-0  mt-20">
      {services.map((service, index) => (
        <Link key={index} to={`/Services/${service.title}`}>
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="sm:w-[300px] 2xl:w-[400px] h-auto bg-gray-300 hover:bg-orange-400 transition-colors duration-300 cursor-pointer rounded-lg shadow-lg"
          >
            <img src={`http://localhost:3001/servicesPhotos/${service.image}`} className="w-full h-[200px] object-top" />
            <div className="text-center p-4">
              <h1 className="font-bold text-xl">{service.title}</h1>
              <p className="text-sm text-gray-700">
                {service.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
