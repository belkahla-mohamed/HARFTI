import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services({ images }) {
  const cardsRef = useRef([]);

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
      {images.map((i, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="sm:w-[300px] 2xl:w-[400px] h-auto bg-gray-300 hover:bg-orange-400 transition-colors duration-300 cursor-pointer rounded-lg shadow-lg"
        >
          <img src={`./images/slide/${i}`} className="w-full h-[200px] object-cover" />
          <div className="text-center p-4">
            <h1 className="font-bold text-xl">Service {index + 1}</h1>
            <p className="text-sm text-gray-700">
              This is a description for service {index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
