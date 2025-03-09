import React from "react";
export default function InfoProfile({ user ,Items }) {
    return (
        <div className="flex flex-col h-[auto] w-full items-center gap-y-10  ">


            <div >
                {user && <img src={`http://localhost:3001/EmployeePhotos/${Items ? Items:user.photo }`} className="rounded-[50%] h-30 flex justify-center " />}
            </div>



            <div className={`flex flex-col items-start gap-3  text-black  `}  >
                <div className="flex space-x-5" ><h2 className="text-black    font-bold" >Fullname :</h2>  <p> {user && user.fullname} </p></div>
                <div className="flex space-x-5" ><h2 className="text-black    font-bold" >User Name :</h2>  <p> {user && user.username} </p></div>
                <div className="flex space-x-5" ><h2 className="text-black    font-bold" >Phone : </h2>  <p> {user && user.phone} </p></div>

                <div className="flex space-x-5" ><h2 className="text-black   font-bold">Email:</h2> <p>{user && user.email}</p>   </div>

            </div>
        </div>
    )
}