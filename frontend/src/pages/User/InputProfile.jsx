import * as Yup from "yup";  // ✅ Import Yup
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import SelectCombobox from "../combobox/SelectCombobox";

// **Yup Schema Validation**
const validationSchema = Yup.object({
    fullname: Yup.string(),
    username: Yup.string(),
    age: Yup.number()
        .positive("Age must be positive")
        .integer("Age must be an integer"),
    phone: Yup.string()
        .matches(/^\d+$/, "Phone must contain only numbers")
        ,
    email: Yup.string().email("Invalid email format"),
    oldPass:  Yup.string().min(6, 'Password must be at least 6 characters').required('Your Password is required'),
    newPass:  Yup.string().min(6, 'Password must be at least 6 characters'),
});

export default function InputProfile({ setYupError, selectedServices, setSelectedServices, newInfos, setNewInfos, user, setAvatar, avatar, setPhoto, photo }) {
    const [imag, setImag] = useState(false);

    useEffect(() => {
        const validateForm = async () => {
            try {
                await validationSchema.validate(newInfos, { abortEarly: false });
                setYupError({}); // ✅ Clear errors on success
            } catch (err) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setYupError(newErrors);
            }
        };

        validateForm();
    }, [newInfos]); // ✅ Validate when newInfos changes

    const folder = user && user.photo.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';
    const imageSource = avatar
        ? `https://harftibackend-production.up.railway.app/uploads/${avatar}`
        : photo
        ? "https://harftibackend-production.up.railway.app/uploads/default.png"
        : user?.photo && `https://harftibackend-production.up.railway.app/${folder}/${user.photo}`;

    return (
        <div className="w-full flex justify-center flex-col items-center gap-y-8">
            <img
                title="Click To Update"
                onClick={() => setImag(true)}
                src={imageSource}
                className="rounded-[50%] h-30 w-30 flex justify-center"
            />
            {imag && <Avatar setAvatar={setAvatar} setPhoto={setPhoto} setImag={setImag} />}

            <div className="flex w-full items-center flex-col gap-4">
                <input type="text" defaultValue={user?.fullname} onChange={(e) => setNewInfos({ ...newInfos, fullname: e.target.value })} placeholder="fullname..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="text" defaultValue={user?.username} onChange={(e) => setNewInfos({ ...newInfos, username: e.target.value })} placeholder="username..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />

                {user?.role === "employee" && (
                    <>
                        <input type="number" defaultValue={user?.age} onChange={(e) => setNewInfos({ ...newInfos, age: Number(e.target.value) })} placeholder="age..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                        <input type="tel" defaultValue={user?.phone} onChange={(e) => setNewInfos({ ...newInfos, phone: e.target.value })} placeholder="phone..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                        <input type="email" defaultValue={user?.email} onChange={(e) => setNewInfos({ ...newInfos, email: e.target.value })} placeholder="email..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black break-words" />
                        <SelectCombobox setSelectedServices={setSelectedServices} user={user} selectedServices={selectedServices} />
                    </>
                )}

                <input type="password" onChange={(e) => setNewInfos({ ...newInfos, oldPass: e.target.value })} placeholder="OldPass..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
                <input type="password" onChange={(e) => setNewInfos({ ...newInfos, newPass: e.target.value })} placeholder="NewPass..." className="border-2 h-[35px] w-70 rounded-2xl px-6 py-3 text-[#333333] border-gray-300 focus:border-black" />
            </div>
        </div>
    );
}
