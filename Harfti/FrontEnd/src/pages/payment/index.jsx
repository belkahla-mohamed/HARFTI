import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { Coins, CreditCard } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function Index() {
    const refTitle = useRef();
    const refCash = useRef();
    const refOnline = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        gsap.from(refTitle.current, { y: -100, duration: 1, opacity: 0 });
        gsap.from(refCash.current, { x: -10000, duration: 0.5, opacity: 0 });
        gsap.from(refOnline.current, { x: 10000, duration: 0.5, opacity: 0 });
    }, [])

    function Cash(){
        navigate('/Problem/Payment/Cash')
    }

    function Online(){
        navigate('/Problem/Payment/Online')
    }
    return (
        <div className="h-full w-full flex flex-col items-center select-none">
            <div ref={refTitle} className="flex items-center">
                <h1 className="text-center 2xl:text-6xl sm:text-4xl text-2xl font-extrabold text-orange-500 cursor-default">Choose Method</h1>
                <DotLottieReact
                    src="https://lottie.host/66ef61eb-c34b-4bf1-8efe-4cc8d005250b/fBiC1LwwPP.lottie"
                    loop
                    autoplay
                    className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
                />
            </div>

            <div className="w-full h-full flex justify-center sm:px-0 px-6 items-center">
                <div className="sm:w-[70%] w-full gap-y-6  gap-x-8 flex sm:flex-row flex-col ">
                    <div ref={refCash} onClick={Cash} className="bg-orange-500 sm:w-[50%] w-full flex flex-col p-4 rounded-2xl cursor-pointer hover:scale-95 duration-1 ease-in-out items-center justify-center">
                        <Coins className="w-20 h-20 text-white" />
                        <p className="sm:text-5xl text-3xl text-center text-white font-bold">Cash</p>
                    </div>

                    <div ref={refOnline} onClick={Online} className="bg-orange-500 sm:w-[50%] w-full flex flex-col p-4 rounded-2xl cursor-pointer hover:scale-95 duration-1 ease-in-out items-center justify-center">
                        <CreditCard className="w-20 h-20 text-white" />
                        <p className="sm:text-5xl text-3xl text-center text-white font-bold">Online Payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}