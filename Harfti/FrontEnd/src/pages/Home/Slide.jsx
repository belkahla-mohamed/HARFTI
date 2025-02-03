import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ImageSlider({ images }) {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, { opacity: 1, duration: 1 });
  }, []);

  return (
    <div className="relative">
      <Swiper
        ref={boxRef}
        direction="horizontal"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper h-[600px] mt-11 z-30 shadow-lg opacity-0 relative p-6 border-4 border-transparent rounded-lg"
      >
        {images.map((i, index) => (
          <SwiperSlide key={index}>
            <img
              src={`./Images/bgs/${i}`}
              className="w-full h-[600px] "
            />
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
