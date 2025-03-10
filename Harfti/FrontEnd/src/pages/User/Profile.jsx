import axios from "axios";
import { FilePenLine, LogOut, Save, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoProfile from "./InfoProfile";
import InputProfile from "./InputProfile";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
export default function Profile() {
    const navigate = useNavigate()

    const userID = JSON.parse(sessionStorage.getItem('userID'))
    const [user, setUser] = useState({ service: [] });
    const [message, setMessage] = useState("");
    const [Edit, setEdit] = useState(false)
    const [newInfos, setNewInfos] = useState({});
    // const [fullname, setnewFullname] = useState(user?.fullname);
    // const [newusername, setnewUsername] = useState(user?.username);
    // const [age, setnewAge] = useState(user?.age);
    // const [newemail, setnewEmail] = useState(user?.email);
    // const [phone, setnewPhone] = useState(user?.phone);


    const [avatar, setAvatar] = useState(null);
    const [photo, setPhoto] = useState(null);

    const formData = new FormData();
    useEffect(() => {
        if (userID) {
            axios.post('http://127.0.0.1:3001/user/Profile', { userID })
                .then((res) => {
                    if (res.data.status === "success") {
                        setUser(res.data.user)
                        setMessage(res.data.message)
                    } else {
                        setMessage("user don't fonded")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            navigate('/Register')
        }

    }, [Update])

    function Logout() {
        Swal.fire({
            title: "Are You sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#333333',
            cancelButtonColor: "red",
            confirmButtonText: 'Yes, Logout!'
        }).then((res) => {
            if (res.isConfirmed) {
                sessionStorage.removeItem("userID")

                navigate('/Register')
            }
        })

    }

    async function Update() {
        try {
            // Add photo in formData if avatar or photo is selected
            if (avatar) {
                formData.append("photo", avatar);
            }
            if (photo) {
                formData.append("photo", photo);
            }
            if (userID) {
                formData.append("userID", userID);
            }

            // Loop to append other information
            for (const [key, value] of Object.entries(newInfos)) {
                formData.append(key, value);
            }

            // Send the request to update user profile
            await axios.put('http://127.0.0.1:3001/user/Profile/Update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then((res) => {
                    if (res.data.status === "success") {
                        toast.success(res.data.message);
                        setEdit(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        
                    } else {
                        toast.error(res.data.message);
                    }
                })
        }
        catch (error) {
            console.log(error);
        }


    }


    return (
        <div className="w-full flex justify-center sm:p-0 p-4 text-white  ">
            <ToastContainer />
            <div className="sm:w-[50%] w-full  bg-[white] shadow-2xl sm:bg-[url('/test4.jpg')] bg-[url('/test6.jpg')] bg-cover bg-center  rounded-sm text-center  h-[auto] mt-5  flex-col  flex pb-11   items-center  ">
                <div className="w-full flex justify-end p-3" title="Logout" >
                    <LogOut className="text-red-600 w-9 h-9 bg-red-400 rounded-[50%]  p-1.5 hover:text-red-400  hover:bg-red-700  " onClick={Logout} />
                </div>

                {!Edit ? <InfoProfile user={user} avatar={avatar} photo={photo} /> : <InputProfile setAvatar={setAvatar} avatar={avatar} photo={photo} setPhoto={setPhoto} newInfos={newInfos} setNewInfos={setNewInfos} user={user} />}



                <div className="flex gap-x-4 mt-5 " >
                    {Edit ?
                        <button onClick={() => { setEdit(false), setAvatar('') }} className="bg-[#333333] hover:bg-[#2e2d2d] flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white">Back</button>
                        :
                        ""}
                    {!Edit ?
                        <button className="bg-orange-500 hover:bg-orange-600 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white" onClick={() => setEdit(true)}> Edit &nbsp; <UserPen className="w-5" /> </button>
                        :
                        <button className="bg-orange-500 hover:bg-orange-600 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white gap-x-2" onClick={Update}><Save className="w-5" /> Save   </button>}

                </div>
            </div>


        </div>
    )
}