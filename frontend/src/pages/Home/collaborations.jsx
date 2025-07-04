import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

export default function Collaborations() {
    const images = [
        'coll (1).jpg',
        'coll (2).jpg',
        'coll (3).jpg',
        'coll (4).jpg',
        'coll (5).jpg',
        'coll (1).jpg',
        'coll (2).jpg',
        'coll (3).jpg',
        'coll (4).jpg',
        'coll (5).jpg',
    ];

    return (
        <div className="w-full mt-20 py-2 sm:py-4 rounded-md px-8 overflow-hidden"> {/* Add overflow-hidden to prevent scroll */}
            <Swiper
                grabCursor={true}
                loop={true}  // Enable infinite loop
                slidesPerView={4}  // Show 4 images at a time
                spaceBetween={10}  // Add some space between slides
                autoplay={{
                    delay: 1000,  // Transition time between slides
                    disableOnInteraction: false,  // Keep autoplay active even after user interaction
                }}
                loopAdditionalSlides={2}  // Add extra slides for smoother looping
                modules={[Autoplay]}  // Import Autoplay module
                className="mySwiper shadow-lg bg-gray-300 py-8"
                breakpoints={{
                    // Responsive breakpoints
                    320: { // For smaller screens
                        slidesPerView: 3,
                        spaceBetween: 5,
                    },
                    640: { // For medium screens
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: { // For larger screens
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                }}
            >
                {images.map((i, index) => (
                    <SwiperSlide key={index}>
                        <img 
                            src={`./Images/${i}`} 
                            className="h-[70px] w-[70px] sm:w-[100px] sm:h-[100px] py-3 object-contain" // Use object-contain to ensure images fit
                            alt={`Collaboration ${index + 1}`} // Add alt text for accessibility
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}