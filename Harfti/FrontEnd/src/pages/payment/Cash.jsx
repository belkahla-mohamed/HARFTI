import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function Cash() {
    return (
        <div className="min-h-screen w-full flex flex-col pt-16 px-2 sm:px-0 items-center select-none">
            <DotLottieReact
                src="https://lottie.host/03408136-597e-4b22-8ac7-31b89c03d109/XvUII1aSCi.lottie"
                loop
                autoplay
                className="sm:w-[400px] sm:h-[400px] w-[200px] h-[200px]"
            />
            <p className="text-center text-green-500 font-bold text-xl sm:text-2xl">Your request has been successfully registered.</p>
            <p className="text-center text-sm sm:text-xl text-gray-500">You will receive our response soon. Please stay tuned.</p>
            <a className="text-center underline text-md font-bold" href="/">Go back to Home</a>
        </div>
    )
}