import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Mail, Phone, PhoneCall } from 'lucide-react';
import gsap from "gsap";

export default function EmployeesService() {
    const [employees, setEmployees] = useState();
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
                }else{
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
        <div className="min-h-screen w-full flex flex-col gap-10 mt-20 items-center select-none">
            <h1 className="text-start sm:text-6xl text-2xl font-extrabold text-orange-500 cursor-default">Employees in {service}</h1>
            <div className="w-full  grid 2xl:grid-cols-4 sm:grid-cols-3 grid-cols-1  gap-4 p-4">

                {employees && employees.map((employee, index) =>
                    <div ref={(e) => emplRefs.current[index] = e} className="bg-gray-300 h-auto w-full space-y-2 rounded-xl pb-4 shadow">
                        <img src={`http://localhost:3001/uploads/${employee.image}`} className="w-full h-[200px] rounded-t-xl" />
                        <h1 className="text-center text-xl font-extrabold">{employee.fullname}</h1>
                        <p className="text-center">{employee.age} years old</p>
                        <div className="flex justify-center gap-x-3 items-center">
                           <Phone />
                           <p> {employee.contact.tel}</p> 
                        </div>
                        <div className="flex justify-center gap-x-3 items-center">
                           <Mail/>
                           <p> {employee.contact.email}</p> 
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="flex bg-orange-500 p-2 rounded font-bold text-white gap-2 cursor-pointer" ><PhoneCall/>Contact Now</button>
                        </div>
                        
                    </div>
                ) }

                



            </div>
        </div>

    )
}