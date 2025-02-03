import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

export default function Collaborations() {
    const images = [
        'coll1.jpg',
        'coll2.jpg',
        'coll3.jpg',
        'coll4.jpg',
        'coll3.jpg'
    ]

    return (
        <div className="w-full mt-20 py-2 sm:py-4 rounded-md px-8">
            <Swiper
                grabCursor={true}
                loop={true}
                slidesPerView={4}  // Show one image at a time
                spaceBetween={1}  // Remove space between slides
                autoplay={{
                    delay: 1000,  // Transition time between slides
                    disableOnInteraction: false,  // Keep autoplay active even after user interaction
                }}
                loopAdditionalSlides={1}  // Ensures smooth looping without gaps
                modules={[Autoplay]}  // Import Autoplay module
                className="mySwiper shadow-lg bg-white py-8"
            >
                {images.map((i, index) => (
                    <SwiperSlide key={index}>
                        <img src={`./images/collaborations/${i}`} className="h-[80px] sm:w-full sm:h-[150px] " />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
