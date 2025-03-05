import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";
export default function InputProfile({ setnewUserName, setnewEmail, setnewFirstName, setnewLastName, user, setItems, Items }) {


    const [imag, setImag] = useState(false)

    return (
        <div className="w-full flex justify-center flex-col items-center gap-y-8">
            {user &&
                <img title="Click To Update" onClick={() => setImag(true)} src={`http://localhost:3001/uploads/${Items ? Items : user.image}`} className="rounded-[50%] h-30 flex justify-center " />
            }
            <div className={`${imag ? '' : 'hidden'}`}>
                <Avatar setItems={setItems} setImag={setImag} />
            </div>

            <div className="flex w-full items-center flex-col gap-4 ">

                <input type="text" defaultValue={user?.username} onChange={(e) => setnewUserName(e.target.value)} className="border-2 h-[35px] w-70  rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="text" defaultValue={user?.firstName} onChange={(e) => setnewFirstName(e.target.value)} className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="text" defaultValue={user?.lastName} onChange={(e) => setnewLastName(e.target.value)} className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="email" defaultValue={user?.email} onChange={(e) => setnewEmail(e.target.value)} className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black break-words" />

            </div>
        </div>

    )
}