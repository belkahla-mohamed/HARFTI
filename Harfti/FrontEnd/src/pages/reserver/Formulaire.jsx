import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { Camera, NotebookPen, Phone, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Formulaire() {
    const refTitle = useRef();
    const refInputs = useRef([]);

    useEffect(() => {
        // Animate Title First
        gsap.from(refTitle.current, { y: -100, duration: 1, opacity: 0 });

        // Animate Inputs in Sequence
        const tl = gsap.timeline({ delay: 0.4 });

        refInputs.current.forEach((input, index) => {
            tl.from(input, {
                y: -10,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            }, `+=0.2`);
        });
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col px-4 sm:px-0 items-center select-none">
            <div ref={refTitle} className="flex items-center">
                <h1 className="text-center 2xl:text-6xl sm:text-4xl text-2xl font-extrabold text-orange-500 cursor-default">
                    Describe Your Problem
                </h1>
                <DotLottieReact
                    src="https://lottie.host/f40498e5-49e1-428b-9612-35c06f093ce5/nW3QS7nTW4.lottie"
                    loop
                    autoplay
                    className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
                />
            </div>

            <div className="bg-gray-300 gap-y-6 px-4 sm:px-28 rounded-2xl h-full flex flex-col w-full sm:w-auto py-28 items-center">
                <div ref={(e) => refInputs.current[0] = e} className="flex h-full gap-x-5 w-full items-center justify-center">
                    <Camera className=" w-[50px] h-[50px]" />
                    <div className="flex">
                        <label htmlFor="img" className="bg-white text-center border rounded-2xl p-2 border-black border-4 font-bold w-[200px] sm:w-[500px]">
                            Picture For Your Problem
                        </label>
                        <input type="file" id="img" className="hidden" />
                    </div>
                </div>

                <div ref={(e) => refInputs.current[1] = e} className="flex w-full gap-x-5 items-center justify-center">
                    <Phone className="w-[50px] h-[50px]" />
                    <input type="text" placeholder="Your Contact" className="border w-[200px] sm:w-[500px] bg-white rounded-2xl p-2 border-black border-4 outline-none" />
                </div>

                <div ref={(e) => refInputs.current[2] = e} className="flex w-full gap-x-5 items-center justify-center">
                    <NotebookPen className="w-[50px] h-[50px]" />
                    <textarea rows={1} placeholder="Description" className="border w-[200px] sm:w-[500px] bg-white rounded-2xl p-2 border-black border-4 outline-none"></textarea>
                </div>

                <div ref={(e) => refInputs.current[3] = e} className="flex w-full gap-x-5 items-center justify-center">
                    <input type="checkbox" className="w-5 h-5 accent-orange-500" />
                    <label className="sm:text-xl text-lg">Allow notifications to be sent on contact</label>
                </div>

                <div ref={(e) => refInputs.current[4] = e} className="w-full flex justify-center mt-5">

                    <button className="flex justify-center rounded-2xl gap-2 items-center text-white font-bold hover:bg-orange-600 bg-orange-500 w-[70%] p-2" type="submit">
                        <Link to="/Problem/Payment" className="flex justify-center gap-2 items-center">
                            <Send className="w-4 h-4" />
                            <span>Send</span>
                            <Send className="w-4 h-4 rotate-170" />
                        </Link>
                    </button>

                </div>
            </div>
        </div>
    );
}
