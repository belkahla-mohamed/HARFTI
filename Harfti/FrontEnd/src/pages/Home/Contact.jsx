import { Send } from "lucide-react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  // Initialize the ref as an empty array
  const inputsRef = useRef([]);

  // Clear refs on each render to avoid duplicates
  inputsRef.current = [];

  // Callback ref function to add each element to our array
  const addToRefs = (el) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el);
    }
  };

  useEffect(() => {
    
    gsap.from(inputsRef.current, {
      opacity: 0,       
      y: 50,            
      stagger: 0.3,    
      duration: 1,      
      scrollTrigger: {
        trigger: ".contact", 
        start: "top 85%",            
        end: "top 50%",              
        scrub: true,                
      },
    });
  }, []);

  return (
    <div className="w-full px-4 sm:px-18 mt-20">
      <div className="bg-gray-300 flex rounded-4xl">
        <div className="w-full sm:w-[60%] p-8">
          <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col space-y-8 text-[#333333] contact">

            <input type="hidden" name="access_key" value="69656b03-87ae-45ed-80a7-603e23e4a49d"/>

            <h1 ref={addToRefs} className="text-center text-6xl">
              Contact Us
            </h1>
     
            <input ref={addToRefs} type="text" name="fullname" placeholder="Fullname..." className="w-full h-[40px] rounded px-8 bg-white" />
            <input ref={addToRefs}  type="email"  name="Email" placeholder="Email..." className="w-full h-[40px] rounded px-8 bg-white"/>
            <input ref={addToRefs} type="number" name="Age" placeholder="Age..." className="w-full h-[40px] rounded px-8 bg-white"/>
            <textarea ref={addToRefs} name="message" placeholder="Your problems..." className="w-full h-[40px] rounded px-8 py-2 bg-white"></textarea>
          

            <div className="flex justify-center">
              <button ref={addToRefs} type="submit" className="bg-orange-400 w-[50%] flex justify-center h-[40px] gap-2 items-center rounded text-white font-bold cursor-pointer">
                <Send className="w-4 h-4" />
                <span>Send</span>
                <Send className="w-4 h-4 rotate-170" />
              </button>
            </div>

          </form>
        </div>
        <div className="w-0 sm:w-[40%] hidden sm:flex justify-center items-center rounded-4xl">
          <img src="/images/bgs/bg1.jpg" alt="Background" className="w-full h-full relative"/>
          <h1 className="absolute sm:text-xl 2xl:text-3xl text-blue-950 font-bold break-words">
            Let's <br /><span className="text-black px-2"> share your Problems with us,<br /> for Your Comfort.</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
