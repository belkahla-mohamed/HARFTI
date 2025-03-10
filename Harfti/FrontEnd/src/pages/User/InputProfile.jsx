import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";
export default function InputProfile({ newInfos, setNewInfos, user, setAvatar, avatar, setPhoto, photo }) {


    const [imag, setImag] = useState(false)
    const folder = user && user.photo.startsWith('avatar') ? 'uploads' : 'EmployeePhotos'
    const imageSource = avatar ? `http://localhost:3001/uploads/${avatar}` :
        (photo ? `http://localhost:3001/EmployeePhotos/${photo}` :
            `http://localhost:3001/${folder}/${user.photo}`);
    return (
        <div className="w-full flex justify-center flex-col items-center gap-y-8">
            <img title="Click To Update" onClick={() => setImag(true)} src={imageSource} className="rounded-[50%] h-30 w-30 flex justify-center " />
            {imag && <Avatar setAvatar={setAvatar} setPhoto={setPhoto} setImag={setImag} />}



            <div className="flex w-full items-center flex-col gap-4 ">
                <input type="text" defaultValue={user?.fullname} onChange={(e) => setNewInfos({ ...newInfos, fullname: e.target.value })} placeholder="fullname..." className="border-2 h-[35px] w-70  rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="text" defaultValue={user?.username} onChange={(e) => setNewInfos({ ...newInfos, username: e.target.value })} placeholder="username..." className="border-2 h-[35px] w-70  rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />

                {user?.role === "employe" &&
                    <input type="number" defaultValue={user?.age} onChange={(e) => setNewInfos({ ...newInfos, age: Number(e.target.value) })} placeholder="age..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                }
                {user?.role === "employe" &&
                    <input type="tel" defaultValue={user?.phone} onChange={(e) => setNewInfos({ ...newInfos, phone: e.target.value })} placeholder="phone..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                }
                {user?.role === "employe" &&
                    <input type="email" defaultValue={user?.email} onChange={(e) => setNewInfos({ ...newInfos, email: e.target.value })} placeholder="email..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black break-words" />
                }
                <input type="password" onChange={(e) => setNewInfos({ ...newInfos, oldPass: e.target.value })} placeholder="OldPass..." className="border-2 h-[35px] w-70  rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="password" onChange={(e) => setNewInfos({ ...newInfos, newPass: e.target.value })} placeholder="NewPass..." className="border-2 h-[35px] w-70  rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />

            </div>
        </div>

    )
}