import React from "react";
import Slide from "./Slide";
import Services from "./Services";
import Features from "./Features";
import Collaborations from "./collaborations";
import Contact from "./Contact";




export default function Home() {
    const images = [
        'img (1).jpg',
        'img (2).jpg',
        'img (3).jpg',
        'img (4).jpg',
        'img (5).jpg',
        'img (6).jpg'
    ]
    return (

        <div className="w-full select-none">
            <Slide images={images} />

            <Features />
            <Services images={images} />
            <Collaborations />
            <Contact />
            
        </div>
    )
}