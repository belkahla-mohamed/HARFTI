import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import {
    CalendarDays, HandPlatter, ImageDown, Mail, Phone, User,
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench,
    RectangleEllipsis
} from "lucide-react";
import * as Yup from 'yup';
import 'animate.css';

const iconsMap = {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench
};

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('fullname is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    photo: Yup.mixed().required('Photo is required'),
    service: Yup.string().required('Service is required'),
    email: Yup.string().email('Invalid email : "example@gmail.com"').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required('Password is required'),
    day: Yup.number()
        .min(1, 'Day must be at least 1')
        .max(31, 'Day must be at most 31')
        .required('Day is required'),
    month: Yup.number()
        .min(1, 'Month must be at least 1')
        .max(12, 'Month must be at most 12')
        .required('Month is required'),
    year: Yup.number()
        .min(1900, 'Year must be at least 1900')
        .max(new Date().getFullYear(), `Year must be at most ${new Date().getFullYear()}`)
        .required('Year is required')
});

export default function Form() {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        fullname: '',
        age: '',
        photo: null,
        service: '',
        email: '',
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState({
        year: null,
        month: null,
        day: null
    });
    const [touched, setTouched] = useState({}); // Track touched fields

    useEffect(() => {
        axios.get("http://localhost:3001/services")
            .then((res) => {
                if (res.data.status === "success") {
                    setServices(res.data.services.map(service => ({
                        value: service.id,
                        label: service.title,
                        icon: iconsMap[service.icon] ? React.createElement(iconsMap[service.icon], { className: "w-4 h-4 text-black" }) : null
                    })));
                }
            })
            .catch((err) => console.log(err));
    }, []);

 
        
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#F4F4F5",
            borderColor: "#D1D5DB",
            boxShadow: "none",
            borderRadius: "8px",
            padding: "8px",
            outline: "none",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#D1D5DB",
            borderRadius: "8px",
            padding: "8px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#FB923C" : "#D1D5DB",
            color: "black",
            "&:hover": { backgroundColor: "#FB923C" },
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#000000" : "#333333",
        }),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setTouched({ ...touched, [name]: true }); // Mark the field as touched
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            setTouched({ ...touched, photo: true }); // Mark the field as touched
        }
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, service: selectedOption.label });
        setTouched({ ...touched, service: true }); // Mark the field as touched
    };

    // Validate form data and date whenever they change
    useEffect(() => {
        const validateForm = async () => {
            try {
                const dataToValidate = { ...formData, ...date };
                await validationSchema.validate(dataToValidate, { abortEarly: false });
                setErrors({}); // Clear errors if validation passes
            } catch (err) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    if (touched[error.path]) { // Only show errors for touched fields
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors); // Set errors if validation fails
            }
        };

        validateForm();
    }, [formData, date, touched]);

    useEffect(() => {
        if (date.day && date.year && date.month) {
            const today = new Date();
            let Age = today.getFullYear() - date.year;
            const day = today.getDate();
            const month = today.getMonth() + 1;
            if (date.month >= month && date.day >= day) {
                Age -= 1;
            }
            setFormData({
                ...formData,
                age: Age
            });
        }
    }, [date]);

    const handleSubmit = async () => {
        if(formData.fullname && formData.age && formData.email && formData.password && formData.phone && formData.service ){

            try {
                const dataToValidate = { ...formData, ...date };
                await validationSchema.validate(dataToValidate, { abortEarly: false });
                setErrors({});
                // Proceed with form submission
                console.log('Form data submitted:', formData);
                axios.post('http://localhost:3001/services/RegisterEmploye' , formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }}
    
                 )
    
            } catch (err) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
        }else{
            setTouched({ ...touched, photo: true , email:true , fullname:true , phone:true , service:true ,day:true , month:true , year:true , password:true  });
        }
    };

    return (
        <div className="w-full py-5 flex flex-col items-center rounded-b-md space-y-1">
            <div className="animate__animated animate__jackInTheBox animate__delay-0.3s">
                <h1 className="text-4xl py-7 font-bold text-center text-[#333333]">
                    🚀 Starting Strong as an Employee
                </h1>
            </div>
            <div className="grid sm:grid-rows-3 grid-cols-1 sm:grid-cols-2 gap-x-20">
                {/* fullname */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Fullname <span className="text-xs text-red-500">(*professional)</span>:</label>
                    <div className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <User />
                        <input
                            type="text"
                            name="fullname"
                            onChange={handleChange}
                            className="w-full focus:border-blue-500 hover:border border border-gray-200 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px]"
                            placeholder="Your Professional Name..."
                        />
                    </div>
                    {touched.fullname && errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                </div>

                {/* Age */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Age:</label>
                    <div className="flex items-center bg-gray-200 px-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <CalendarDays className="mr-2" />
                        <div className="flex w-full gap-x-2">
                            <input
                                name="day"
                                onChange={(e) => {
                                    setDate({ ...date, day: Number(e.target.value) });
                                    setTouched({ ...touched, day: true }); // Mark the field as touched
                                }}
                                type="number"
                                placeholder="dd"
                                className="w-full text-start hover:border border focus:border-blue-500 border-gray-200 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px] w-15"
                            />
                            <input
                                name="month"
                                onChange={(e) => {
                                    setDate({ ...date, month: Number(e.target.value) });
                                    setTouched({ ...touched, month: true }); // Mark the field as touched
                                }}
                                type="number"
                                placeholder="mm"
                                className="w-full text-start hover:border focus:border-blue-500 border border-gray-200 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px] w-15"
                            />
                            <input
                                name="year"
                                onChange={(e) => {
                                    setDate({ ...date, year: Number(e.target.value) });
                                    setTouched({ ...touched, year: true }); // Mark the field as touched
                                }}
                                type="number"
                                placeholder="yy"
                                className="w-full text-start hover:border focus:border-blue-500 border border-gray-200 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px] w-20"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                    {touched.day && errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
                    {touched.month && errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
                    {touched.year && errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}

                    </div>
                </div>

                {/* Photo */}
                <div className="w-90 space-y-2">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo:</label>
                    <div className="flex items-center gap-2 bg-gray-200 px-4 py-4 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <ImageDown className="mr-2" />
                        <label htmlFor="photo" className="w-full bg-white text-gray-500 py-2.5 rounded-md px-2 outline-none"> {formData.photo ?  `The type of photo selected is "${formData.photo.type}"` : 'Your image'} </label>
                        <input
                            id="photo"
                            name="photo"
                            onChange={handleFileChange}
                            type="file"
                            className="hidden w-full outline-none text-[#333333] file:bg-gray-400 file:text-white file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-500 transition-all duration-150"
                        />
                    </div>
                    {touched.photo && errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                </div>

                {/* Service */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Service:</label>
                    <div className="flex gap-2 items-center bg-gray-200 px-4 py-1.5 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <HandPlatter />
                        <Select
                            onChange={handleSelectChange}
                            options={services}
                            formatOptionLabel={(service) => (
                                <div className="flex items-center gap-2">
                                    {service.icon} <span>{service.label}</span>
                                </div>
                            )}
                            className="w-full"
                            isSearchable
                            styles={customStyles}
                        />
                    </div>
                    {touched.service && errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                </div>

                {/* Email */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Email:</label>
                    <div className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <Mail />
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="w-full hover:border border border-gray-200 hover:border-blue-500 focus:border-blue-500 p-[11px] outline-none bg-white rounded-[8px]"
                            placeholder="Your Email..."
                        />
                    </div>
                    {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Phone:</label>
                    <div className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <Phone />
                        <input
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            className="w-full hover:border border border-gray-200 focus:border-blue-500 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px]"
                            placeholder="Your Phone Number..."
                        />
                    </div>
                    {touched.phone && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div className="w-90">
                    <label className="block text-sm font-medium text-gray-700 py-1.5">Password:</label>
                    <div className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-150">
                        <RectangleEllipsis />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full hover:border border focus:border-blue-500 border-gray-200 hover:border-blue-500 p-[11px] outline-none bg-white rounded-[8px]"
                            placeholder="Your Password..."
                        />
                    </div>
                    {touched.password && errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Buttons */}
                <div className="w-full h-full flex items-end justify-end">
                    <div className="flex w-full mt-4 justify-end gap-x-4">
                        <button type="reset" className="bg-white border-1 border-black rounded-md text-gray-700 font-bold px-4 py-2">Cancel</button>
                        <button onClick={handleSubmit} className="bg-gray-700 text-white font-bold rounded-md px-4 py-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}