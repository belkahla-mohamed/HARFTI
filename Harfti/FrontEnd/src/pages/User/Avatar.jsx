import { useState } from "react";
import { CircleX } from 'lucide-react';

export default function Avatar({ setItems,setAvatar , setfile }) {
    
    return (
        <div className=" relative flex  pt-10 flex-wrap w-full justify-center gap-3">
             
            
                <div className="cursor-pointer " onClick={()=>setAvatar(false)}>
                    <CircleX className="absolute  flex right-3 top-0 "   />
                </div>
            
            
             
            <img onClick={() => setItems('/Avatar/avatar (1).png')} src="/Avatar/avatar (1).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (2).png')} src="/Avatar/avatar (2).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (3).png')} src="/Avatar/avatar (3).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (4).png')} src="/Avatar/avatar (4).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (5).png')} src="/Avatar/avatar (5).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (6).png')} src="/Avatar/avatar (6).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (7).png')} src="/Avatar/avatar (7).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (8).png')} src="/Avatar/avatar (8).png" className="rounded-[50%] h-20 flex justify-center " />
            <img onClick={() => setItems('/Avatar/avatar (9).png')} src="/Avatar/avatar (9).png" className="rounded-[50%] h-20 flex justify-center " />
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer">
                <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => setfile(e.target.files[0]) && setItems(e.target.files[0]) }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <img className="w-5" src="/Avatar/addPhoto.png" />
            </div>


        </div>
    )
}