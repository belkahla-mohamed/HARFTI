import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect, useState } from "react";
import 'animate.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function AddPost() {
    const formData = new FormData();
    const [post, setPost] = useState();
    const userId = JSON.parse(sessionStorage.getItem('userID'))
    const role = JSON.parse(sessionStorage.getItem('role'))
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== "employee") {
            navigate('/')
        }
        window.scrollTo({top:0})
    }, [])

    const Add = async () => {
        if(!post.description && !post.photo){
            toast.error("The photo and description is required")
        }
        for (const [key, value] of Object.entries(post)) {
            formData.append(key, value)
        }

        if (userId) {
            formData.append('userID', userId);
            try {
                await axios.post('http://127.0.0.1:3001/post/PostEmployee', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((res) => {
                        if (res.data.status === "success") {
                            toast.success(res.data.message);
                            navigate("/Posts")
                        } else {
                            toast.error(res.data.message);
                        }
                    })

            }
            catch (error) {
                console.log(error)
            }
        } else {
            alert('nono')
        }
    }

    const [description, setDescription] = useState("");

    const handleChange = (e) => {
        setDescription(e.target.value);
        setPost({ ...post, description: e.target.value })
    };
    return (
        <div className="w-full  h-full">
            <div className="flex justify-center items-center w-full   rounded-md mt-1   px-15 flex-col py-10">
                <div className="animate_animated animate__bounceIn "><h1 className="text-4xl font-bold pb-8">Create New Post </h1></div>

                <div className="grid w-full sm:grid-cols-2">

                    <div className="flex flex-col w-full shadow-[0px_4px_10px_rgba(0,0,0,0.3)]  rounded-md py-5 px-4 ">
                        <div className="relative w-full  mb-3">
                            <input
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                type="text"
                                id="title"
                                placeholder="Title ..."
                                className="peer w-full px-14 py-3 border  rounded-md 
                                    focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all 
                                    placeholder-transparent focus:placeholder-gray-400   "
                            />
                            <label
                                htmlFor="title"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all 
                            peer-placeholder-shown:top-1/2  peer-placeholder-shown:-translate-y-1/2 
                            peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#333333] peer-focus:bg-white peer-focus:px-1 peer-focus:left-3"
                            >
                                Title :
                            </label>
                        </div>
                        <div className="relative w-full mb-3">
                            <textarea
                                onChange={handleChange}
                                value={description}
                                id="area"
                                placeholder="Description your post ..."
                                className={`peer w-full py-3 pl-4 border rounded-md
                   focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all
                   placeholder-transparent focus:placeholder-gray-400`}
                            />
                            <label
                                htmlFor="area"
                                className={`absolute left-3 transition-all text-gray-500
                  ${description ? "top-0 text-xs text-[#333333] -translate-y-1/2 bg-white px-2" : "top-8.5 -translate-y-1/2"}
                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#333333] 
                  peer-focus:bg-white peer-focus:px-2`}
                            >
                                Description:
                            </label>
                        </div>
                        <div className="relative w-full  mb-3">
                            <input
                                onChange={(e) => setPost({ ...post, prix: e.target.value })}
                                type="text"
                                id="prix"
                                placeholder="Prix DH"
                                className="peer w-full px-14 py-3 border  rounded-md 
                                    focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all 
                                    placeholder-transparent focus:placeholder-gray-400 outline-none "
                            />
                            <label
                                htmlFor="prix"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all 
                                peer-placeholder-shown:top-1/2  peer-placeholder-shown:-translate-y-1/2 
                                peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#333333] peer-focus:bg-white peer-focus:px-1 peer-focus:left-3"
                            >
                                Prix :
                            </label>
                        </div>

                        <div className="relative w-full mb-3 ">
                            <input type="file" accept="video/*" id="photo" className="peer hidden " onChange={(e) => setPost({ ...post, photo: e.target.files[0] })} />
                            <label htmlFor="photo" className="flex items-center justify-between px-4 py-3 border border-black rounded-md cursor-pointer  text-gray-500 transition-all hover:border-[#333333] peer-focus:border-[#333333]  peer-focus:ring-2 peer-focus:ring-[#333333] peer-focus:text-[#333333] "> <span id="fileLabel">Choisir un fichier  📂</span>  </label>

                        </div>


                        <div className="w-full flex justify-end space-x-2 ">

                            <button className="px-5 w-[30%]  py-2  bg-[#333333] text-white rounded-sm hover:bg-black  " >  Cancel </button>
                            <button className="px-5 w-[70%] py-2  bg-orange-400 rounded-sm hover:shadow-xl text-lg duration-200 transition-colors hover:bg-orange-500 " onClick={Add} >Poster  </button>
                        </div>
                    </div>
                    <div className="w-full hidden sm:block  ">
                        <DotLottieReact
                            src="https://lottie.host/072937e6-2d10-49c4-a4d2-42fa7f4babdd/BbfxkYmSUz.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}