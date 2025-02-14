import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import { Navigate } from "react-router-dom";
import Avatar from "./Avatar";
import { FilePenLine, Upload } from 'lucide-react';
import axios from "axios";



export default function Profile() {

    const imageRef = useRef(null)
    const textRef = useRef(null)
    const [avatar, setAvatar] = useState(false)
    const [edit , setEdit] = useState(false)
    const [newfirstName, setnewFirstName] = useState('');
    const [newlastName, setnewLastName] = useState('');
    const [newusername, setnewUsername] = useState('');
    const [newemail, setnewEmail] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [success , setSuccess] =useState('')
    const [error , setError] =useState('')

    const [items, setItems] = useState('/Avatar/avatar (11).png');
    const [file , setfile] = useState(null)

    const user = useSelector(state => state.user)
    console.log(avatar)

    useEffect(() => {
        const timeline = gsap.timeline();
        timeline.fromTo(
            imageRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )

        // Animation du texte
        timeline.fromTo(
            textRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
            "<0.5"
        );
        console.log(avatar)

    }, [])

    const Update = () => {
        const id = user._id;  // Récupérer l'ID de l'utilisateur depuis Redux
        axios.put('http://localhost:3001/update', { id, newfirstName, newlastName, newemail, newusername, newpassword, items })
            .then((res) => {
                if (res.data.status === "success") {
                    setSuccess(res.data.message);
                    setnewEmail('');
                    setnewFirstName('');
                    setnewLastName('');
                    setnewPassword('');
                    setnewUsername('');
                } else {
                    setError(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                setError("An error occurred while updating.");
            });
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id" , user._id)
    console.log(file)
    
const fichier = async ()=>{
    try{
        await axios.put("http://localhost:3001/upload",formData , {headers: { "Content-Type": "multipart/form-data" }})
        .then((res)=>{
            setItems(res.data.filePath); // Stocker le chemin de l'image
            alert("Fichier uploadé avec succès !"); 
        })        


    }
    catch(error){
        console.log(error)
    }
    setAvatar(!avatar)

}

useEffect(()=>{
    setfile(null)
},[items])

function saveAvatar(){
    setAvatar(!avatar) ;
}

    return (
        <div  >
            {success || error}
            {
                user.username ?
                    <div className="w-full flex justify-center text-white ">
                        <div ref={textRef} className="w-[50%] bg-[#333333] rounded-sm sm:mt-5 text-center  h-[auto] mt-52 space-y-10 flex-col  flex py-5 items-center  ">
                            <h1 className=" text-2xl text-center  ">Profile</h1>
                            <div >
                                {user.image.startsWith('/') ?
                                    <img src={items} onClick={saveAvatar} className="rounded-[50%] h-30 flex justify-center " /> 
                                    :<img  src={`http://localhost:3001/uploads/${user.image}`}  className="rounded-[50%] h-30 flex justify-center "/>
                                  }
                                
                                
                                {avatar ? <input type="button" onClick={fichier} value="Save Photo" className="bg-green-600 hover:bg-green-500  hover:font-bold duration-200 ease-in-out py-1 px-2 rounded-sm mt-2 text-white " /> : <input type="button" onClick={()=> setAvatar(!avatar)} value="Edit Photo" className="bg-green-600 hover:bg-green-500 duration-200 ease-in-out py-1 px-2 rounded-sm mt-2 text-white " /> }
                            </div>
                            <div className={`${avatar ? '' : 'hidden'} flex flex-wrap w-full gap-2 `}>

                                <Avatar setfile={setfile} setItems={setItems} setAvatar ={setAvatar}  />

                            </div>
                            <div className={`${avatar ? 'hidden' : 'space-y-5'} `}  >
                                <div className="flex space-x-3" ><h2 className="text-orange-400 font-bold    " >User Name : </h2> {edit ? (<input type="text" onChange={(e)=>setnewUsername(e.target.value)} />) : (<h2>{user.username}</h2>)} </div>
                                <div className="flex space-x-3" ><h2 className="text-orange-400 font-bold    ">First Name : </h2> {edit ? (<input type="text"  onChange={(e)=>setnewFirstName(e.target.value)}/>) : (<h2>{user.firstName}</h2>)} </div>
                                <div className="flex space-x-3" ><h2 className="text-orange-400 font-bold    ">Last Name: </h2> {edit ? (<input type="text"  onChange={(e)=>setnewLastName(e.target.value)}/>) : (<h2>{user.lastName}</h2>)} </div>
                                <div className="flex space-x-3  " ><h2 className="text-orange-400 font-bold    ">Email: </h2> {edit ? (<input type="text" className="w-full" onChange={(e)=>setnewEmail(e.target.value)}/>) : (<h2>{user.email}</h2>)}</div>
                                {edit ?(<div className=" flex space-x-3"> <h2 className="text-orange-400 font-bold   ">Password: </h2> <input type="password" onChange={(e)=>setnewPassword(e.target.value)}/></div>) : ''  }
                                <div className="w-full flex justify-center  space-y-6" onClick={()=>setEdit(!edit)}>{edit ? <button onClick={Update} className="bg-green-600 hover:bg-green-500 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white">  Save &nbsp; <FilePenLine /> </button> :<button className="bg-green-600 hover:bg-green-500 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white">  Edit Info &nbsp; <FilePenLine /> </button> } </div>
                            </div>
                        </div>

                        {/*<div ref={imageRef} className="w-full absolute   top-36 flex justify-end right-48    ">
                            <h1  className="absolute top-30 z-90 text-center text-[#333333] w-[13%] ">Bienvenu <br /> {user.username} </h1>

                            <img  className=" w-52 relative " src="/tableau-removebg.png" />

                        </div> */}
                    </div>
                    : <Navigate to="/" replace />
            }
        </div>


    )
}