import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function Worker() {
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState("");


    useEffect(() => {
        axios.get("http://127.0.0.1:3001/worker/workers")
            .then((res) => {
                if (res.data.status === "success") {
                    setWorkers(res.data.workers);
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage("Erreur lors du chargement des travailleurs.");
            });

    }, []);

    return (
        <div className="flex flex-col justify-center sm:px-0 px-9 py-10 w-full h-auto rounded-b-sm ">
            <div className="w-full text-center text-orange-500 text-3xl font-bold pb-9">
            <h1 className="text-center sm:text-6xl text-2xl font-extrabold text-orange-500 cursor-default"> The workers</h1>
            </div>

            <motion.div
                className="w-full grid grid-cols-1  sm:grid-cols-4 gap-5 justify-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
            >
                {message && <p className="text-red-500">{message}</p>}
                {workers.length > 0 ? (
                    workers.map((worker) => (
                        <motion.div
                            key={worker.id}
                            className="flex-col p-3   rounded-xl shadow-xl bg-gray-300 space-y-2 flex items-center    w-full    hover:shadow-2xs duration-200 ease-in flex-wrap"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                className="w-32 h-32"
                                src={`http://localhost:3001/uploads/${worker.image}`}
                                alt={worker.image}
                            />
                            <div className="  text-center">
                                <p className="text-xl font-bold "> {worker.fullname}</p>
                                <p className="text-lg text-[#333333]"> {worker.service}</p>
                                <p className="text-sm text-[#333333]">{worker.contact?.tel || "N/A"}</p>
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
                    ))
                ) : (
                    <p>Aucun travailleur trouvé.</p>
                )}
            </motion.div>
        </div>
    );
}
