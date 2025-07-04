
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate()
    useEffect(()=> {
        setTimeout(() => {
            navigate('/')
        }, 3000);
    }, [])
    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.img
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                src="/404/notFound.jpeg" className=" w-full" />
        </div>
    )
}