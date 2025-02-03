import React from "react";
import Slide from "./Slide";
import Services from "./Services";
import Features from "./Features";
import Collaborations from "./collaborations";
import Contact from "./Contact";




export default function Home() {
    const images = [
        'bg (1).jpg',
        'bg (2).jpg',
        'bg (3).jpg',
        'bg (4).jpg',
        'bg (5).jpg',
    ]
    const workers =[
        'worker (1).jpg',
        'worker (2).jpg',
        'worker (3).jpg',
        'worker (4).jpg',
        'worker (5).jpg',
        'worker (6).jpg',
        
        
    ]
    return (

        <div className="w-full select-none">
            <Slide images={images} />

            <Features />
            <Services workers={workers}   />
            <Collaborations />
            <Contact />
            
        </div>
    )
}