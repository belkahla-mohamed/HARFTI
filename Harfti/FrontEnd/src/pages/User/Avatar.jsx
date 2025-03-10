import gsap from 'gsap';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Avatar({ setAvatar,setImag, setPhoto }) {
    const AvatarRefs = useRef([]);

    useEffect(()=>{
        gsap.to(
            AvatarRefs.current,{
                opacity:1,
                stagger:0.3,
                duration:0.5,
            }
        )
    },[])
    return (
        <div className=" relative flex  pt-10 flex-wrap w-full justify-center gap-3">
             
            
                <div className="cursor-pointer " onClick={()=>setImag(false)}>
                    <CircleX className="absolute text-black flex right-3 top-0 "   />
                </div>
            
            
             
            <img ref={(e)=>AvatarRefs.current[0]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (1).png')}}  src="http://127.0.0.1:3001/uploads/avatar (1).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[1]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (2).png')}}  src="http://127.0.0.1:3001/uploads/avatar (2).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[2]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (3).png')}}  src="http://127.0.0.1:3001/uploads/avatar (3).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[3]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (4).png')}}  src="http://127.0.0.1:3001/uploads/avatar (4).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[4]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (5).png')}}  src="http://127.0.0.1:3001/uploads/avatar (5).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[5]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (6).png')}}  src="http://127.0.0.1:3001/uploads/avatar (6).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[6]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (7).png')}}  src="http://127.0.0.1:3001/uploads/avatar (7).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[7]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (8).png')}}  src="http://127.0.0.1:3001/uploads/avatar (8).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[8]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (9).png')}}  src="http://127.0.0.1:3001/uploads/avatar (9).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <img ref={(e)=>AvatarRefs.current[9]=e} onClick={() =>  {setImag(false) , setAvatar('avatar (10).png')}}  src="http://127.0.0.1:3001/uploads/avatar (10).png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            <label htmlFor="img">
                <img ref={(e)=>AvatarRefs.current[10]=e} for='img'  src="http://127.0.0.1:3001/uploads/add-photo.png" className="rounded-[50%] h-20 flex justify-center opacity-0 " />
            </label>
            <input type='file' id='img' onChange={(e) => setPhoto(e.target.files[0])} className='hidden' />
        </div>
    )
}