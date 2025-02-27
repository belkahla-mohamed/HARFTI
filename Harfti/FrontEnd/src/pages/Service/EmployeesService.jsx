import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone } from 'lucide-react';
import gsap from "gsap";

export default function EmployeesService() {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState();
    const params = useParams()
    const { service } = params;

    const emplRefs = useRef([]);

    useEffect(() => {


        axios.get("http://127.0.0.1:3001/services/employees");
        axios.post("http://127.0.0.1:3001/services/employees", { service })
            .then((res) => {
                if (res.data.status === 'success') {
                    setEmployees(res.data.employees);
                    setMessage(res.data.message)
                } else {
                    setMessage(res.data.message)
                }
            }).catch((err) => {
                console.log(err);
            });
    }, []);


    useEffect(() => {
        if (emplRefs.current.length) {
            gsap.from(emplRefs.current, {
                y: 50,
                opacity: 0,
                stagger: 0.3, // Adjusted to be faster
                duration: 0.3
            });
        }
    }, [employees]);

    return (
        <div className="min-h-screen px-9 sm:px-0 w-full flex flex-col gap-10 mt-20 items-center select-none">
            <h1 className="sm:text-start text-center sm:text-6xl text-2xl  font-extrabold text-orange-500 cursor-default">Workers in {service}</h1>





            {employees.length ? (<motion.div
                className="w-full grid grid-cols-1  sm:grid-cols-4 gap-5 justify-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
            >
                {employees.map((employee) => (
                    <motion.div
                        key={employee.id}
                        className="flex-col p-3   rounded-xl shadow-xl bg-gray-300 space-y-2 flex items-center    w-full    hover:shadow-2xs duration-200 ease-in flex-wrap"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            className="w-32 h-32"
                            src={`http://localhost:3001/uploads/${employee.image}`}
                            alt={employee.image}
                        />
                        <div className="  text-center">
                            <p className="text-xl font-bold "> {employee.fullname}</p>
                            <p className="text-lg text-[#333333]"> {employee.service}</p>
                            <p className="text-sm text-[#333333]">{employee.contact?.tel || "N/A"}</p>
                            <p className="text-sm text-[#333333]">{employee.age} years old</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <Link to="/location">
                                <button
                                    className="flex bg-orange-500 hover:bg-orange-600 ease-in-out duration-100 p-2 rounded font-bold text-white gap-2 cursor-pointer"
                                >
                                    <Phone /> Contact Now
                                </button>
                            </Link>

                        </div>
                    </motion.div>
                ))}</motion.div>
            ) : (
                <p className="sm:text-2xl text-sm text-gray-400 text-center font-bold">Aucun {service}s trouvé.</p>
            )}






        </div>


    )
}