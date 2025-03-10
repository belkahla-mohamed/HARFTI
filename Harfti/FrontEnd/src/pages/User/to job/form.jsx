import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import {
    CalendarDays, HandPlatter, ImageDown, Phone, 
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller 
   
} from "lucide-react";
import * as Yup from 'yup';
import 'animate.css';

const iconsMap = {
    Anvil, Axe, BrickWall, Briefcase, Circle, Flame,
    Gem, Package, Palette, ScissorsIcon, ScissorsLineDashed, Wrench, Sprout, ShowerHead, PaintRoller 
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

export default function Form({setUser , user , setYupError}) {
    const [services, setServices] = useState([]);
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
            backgroundColor: "#FFFBEB",
            borderColor: "#FFFBEB",
            boxShadow: "none",
            borderRadius: "8px",
            padding: "1.2px",
            outline: "none",
            "&:hover": { borderColor: "#FFFBEB" },


        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#FFFBEB",
            borderRadius: "8px",
            padding: "8px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#FB923C" : "#FFFBEB",
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
        setUser({ ...user, [name]: value });
        setTouched({ ...touched, [name]: true }); // Mark the field as touched
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser({ ...user, photo: file });
            setTouched({ ...touched, photo: true }); // Mark the field as touched
        }
    };

    const handleSelectChange = (selectedOption) => {
        setUser({ ...user, service: selectedOption.label });
        setTouched({ ...touched, service: true }); // Mark the field as touched
    };

    // Validate form data and date whenever they change
    useEffect(() => {
        const validateForm = async () => {
            try {
                const dataToValidate = { ...user, ...date };
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
                setYupError(newErrors); // Set errors if validation fails
            }
        };

        validateForm();
    }, [user, date, touched]);

    useEffect(() => {
        if (date.day && date.year && date.month) {
            const today = new Date();
            let Age = today.getFullYear() - date.year;
            const day = today.getDate();
            const month = today.getMonth() + 1;
            if (date.month >= month && date.day >= day) {
                Age -= 1;
            }
            setUser({
                ...user,
                age: Age
            });
        }
    }, [date]);
    

    const handleSubmit = async () => {
        if (user.fullname && user.age && user.email && user.password && user.phone && user.service) {

            try {
                const dataToValidate = { ...user, ...date };
                await validationSchema.validate(dataToValidate, { abortEarly: false });
                setErrors({});
                // Proceed with form submission
                console.log('Form data submitted:', user);
                axios.post('http://localhost:3001/services/RegisterEmploye', user, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }

                )

            } catch (err) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
        } else {
            setTouched({ ...touched, photo: true, email: true, fullname: true, phone: true, service: true, day: true, month: true, year: true, password: true });
        }
    };

    return (

        <div className="grid grid-cols-1 gap-6">
            <div className="">

                    
                <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                    <CalendarDays className="w-6 h-6 mr-2" />
                    <div className="flex w-full gap-x-2">
                        <input
                            name="day"
                            onChange={(e) => {
                                setDate({ ...date, day: Number(e.target.value) });
                                setTouched({ ...touched, day: true }); // Mark the field as touched
                            }}
                            type="number"
                            placeholder="dd"
                            className="py-2 w-full pr-5 outline-none"
                        />
                        <input
                            name="month"
                            onChange={(e) => {
                                setDate({ ...date, month: Number(e.target.value) });
                                setTouched({ ...touched, month: true }); // Mark the field as touched
                            }}
                            type="number"
                            placeholder="mm"
                            className="py-2 w-full pr-5 outline-none"
                        />
                        <input
                            name="year"
                            onChange={(e) => {
                                setDate({ ...date, year: Number(e.target.value) });
                                setTouched({ ...touched, year: true }); // Mark the field as touched
                            }}
                            type="number"
                            placeholder="yy"
                            className="py-2 w-full pr-5 outline-none"
                        />
                    </div>
                </div>
                {/* <div className="flex justify-between w-full">
                    {touched.day && errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
                    {touched.month && errors.month && <p className="text-red-500 text-sm">{errors.month}</p>}
                    {touched.year && errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}

                </div> */}
            </div>



                <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                    <ImageDown className="w-6 h-6 mr-2" />
                    <label htmlFor="photo" className="w-full  text-gray-500 py-2 rounded-md px-2  pr-5 outline-none"> {user.photo ? `"${user.photo.type}"` : 'Your image'} </label>
                    <input
                        id="photo"
                        name="photo"
                        onChange={handleFileChange}
                        type="file"
                        className="hidden w-full outline-none text-[#333333] file:bg-gray-400 file:text-white file:rounded-md file:px-4 file:py-2 hover:file:bg-gray-500 transition-all duration-150"
                    />
                {/* {touched.photo && errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>} */}
                </div>
       


    

                <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                    <HandPlatter className="w-6 h-6 " />
                    <Select
                        onChange={handleSelectChange}
                        options={services}
                        formatOptionLabel={(service) => (
                            <div className="flex items-center gap-3">
                                <span>{service.label}</span> {service.icon}
                            </div>
                        )}
                        className=" w-full outline-none"
                        isSearchable
                        styles={customStyles}
                    />
                </div>
                {/* {touched.service && errors.service && <p className="text-red-500 text-sm">{errors.service}</p>} */}
      



                <div className="flex bg-amber-50 items-center shadow-lg w-full gap-2 px-2 rounded-sm">
                    <Phone className="w-6 h-6" />
                    <input
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        className="py-2 w-full pr-5 outline-none"
                        placeholder="Your Phone Number..."
                    />
                </div>
                {/* {touched.phone && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>} */}
        





        </div>
    );
}