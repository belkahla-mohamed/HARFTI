import axios from "axios";
import { FilePenLine, LogOut, Save, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoProfile from "./InfoProfile";
import InputProfile from "./InputProfile";
export default function Profile() {
    const navigate = useNavigate()

    const userID = JSON.parse(sessionStorage.getItem('userID'))
    const [user, setUser] = useState();
    const [message, setMessage] = useState("");
    const [Edit , setEdit] = useState(false)

    const [newfirstName, setnewFirstName] = useState(user?.firstName);
    const [newlastName, setnewLastName] = useState(user?.lastName);
    const [newusername, setnewUsername] = useState(user?.username);
    const [newemail, setnewEmail] = useState(user?.email);
    

    const [Items , setItems] = useState()

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
        sessionStorage.removeItem("userID")
        navigate('/Register')
    }
   
    
   async function Update(){
       
       
        try{

            await axios.put('http://127.0.0.1:3001/user/Profile/Update' ,{userID,newemail , newfirstName ,newlastName  ,newusername ,Items } )

        }
        catch(error){
            console.log(error)
        }
        setEdit(false)
    }
    return (
        <div className="w-full flex justify-center sm:p-0 p-4 text-white  ">
            <div className="sm:w-[50%] w-full  bg-[white] shadow-2xl bg-[url('/test6.jpg')] bg-cover bg-center   rounded-sm sm:mt-5 text-center  h-[auto] mt-52  flex-col  flex pb-11   items-center  ">
            <div className="w-full flex justify-end p-3"  title="Logout" >
                <LogOut className="text-red-600 w-9 h-9 bg-red-400 rounded-[50%]  p-1.5 hover:text-red-400  hover:bg-red-700  " onClick={Logout} />
            </div>
            
                {!Edit ? <InfoProfile user={user} Items={Items} /> : <InputProfile Items={Items} setItems={setItems} setnewEmail={setnewEmail} setnewFirstName={setnewFirstName} setnewLastName={setnewLastName}  setnewUserName={setnewUsername} user={user}  />}
                
                

            <div className="w-full flex justify-center mt-5 " >{ !Edit ?  <button className="bg-orange-500 hover:bg-orange-600 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white" onClick={()=>setEdit(true)}> Edit &nbsp; <UserPen className="w-5" /> </button> :  <button className="bg-orange-500 hover:bg-orange-600 flex hover:font-bold duration-200 ease-in-out py-1 px-2.5 text-lg rounded-sm mt-2 text-white gap-x-2" onClick={Update}><Save className="w-5" /> Save   </button>  }</div>
            </div>

            {/*<div ref={imageRef} className="w-full absolute   top-36 flex justify-end right-48    ">
                            <h1  className="absolute top-30 z-90 text-center text-[#333333] w-[13%] ">Bienvenu <br /> {user.username} </h1>

                            <img  className=" w-52 relative " src="/tableau-removebg.png" />

            </div> */}
        </div>
    )
}