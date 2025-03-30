

import axios from "axios"
import { useEffect, useState } from "react"
import { Eye, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DashEmployee() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post("http://127.0.0.1:3001/user/dashUser")
            .then((res) => {
                if (res.data.status === "success") {
                    setUsers(res.data.users.filter((e) =>
                        e.role === 'employee'
                    ))

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [Supprimer])

    function Supprimer(username) {

        axios.post(`http://127.0.0.1:3001/user/dashUser/supp`, { username })
            .then((res) => {
                if (res.data.status === "success") {
                    console.log('User deleted successfully');
                } else {
                    console.log('Error: Could not delete user');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function Show(id) {
        navigate(`/Profile/${id}`)
    }


    return (
        <div className="flex w-full h-screen justify-center  items-start pt-28">
            <div className="sm:overflow-x-hidden overflow-x-auto w-full max-w-6xl table-container">
                <div className="relative sm:overflow-x-hidden overflow-x-auto shadow-md sm:rounded-lg bg-white">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">#</th>
                                <th scope="col" className="px-6 py-3">Fullname</th>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Age</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Service</th>
                                <th scope="col" className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((e, index) => (
                                    <tr
                                        key={e._id}
                                        className="bg-white border-b hover:bg-gray-50"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4">{e.fullname}</td>
                                        <td className="px-6 py-4">{e.username}</td>
                                        <td className="px-6 py-4">{e.email}</td>
                                        <td className="px-6 py-4">{e.age ? e.age : "N/A"}</td>
                                        <td className="px-6 py-4">{e.phone ? e.phone : "N/A"}</td>
                                        <td className="px-6 py-4">
                                            {e.service
                                                ? e.service
                                                    .map((s, i) => (
                                                        <span key={i} className="bg-gray-100 rounded px-2 py-1 mr-1 text-xs">
                                                            {s ? s : "N/A"}
                                                        </span>
                                                    ))
                                                    .slice(0, 3)
                                                : "N/A"}
                                            {e.service && e.service.length > 3 &&
                                                <span className="bg-gray-200 rounded-full px-2 py-1 text-xs ml-1">
                                                    +{e.service.length - 3}
                                                </span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    className="delete-btn items-center gap-1.5 flex text-red-600 hover:bg-red-600/25 transition-all ease-in-out  p-2 rounded   "
                                                    onClick={() => Supprimer(e.username)}
                                                >
                                                    <Trash2 size={15} />
                                                    <span>Delete</span>
                                                </button>
                                                <button
                                                    className="delete-btn items-center gap-1.5 flex text-blue-600 hover:bg-blue-600/25 transition-all ease-in-out  p-2 rounded   "
                                                    onClick={() => Show(e._id)}
                                                >
                                                    <Eye size={15} />
                                                    <span>Show</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

