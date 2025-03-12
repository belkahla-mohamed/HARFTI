import axios from "axios";
import { MessageSquareText, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/post/PostEmployee')
            .then((res) => {
                if (res.data.status === "success") {
                    setPosts(res.data.posts);
                    setEmployees(res.data.employees);
                }
            });
    }, []);

    return (
        <div className="w-full min-h-screen  py-8">
            <div className="w-full max-w-4xl mx-auto grid justify-center gap-6">
                {posts.length ? (
                    posts.map((post, index) => {
                        const findEmployee = employees.find((employee) => employee._id === post.userID);
                        const folder = findEmployee?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';
                        const imageSource = findEmployee?.photo
                            ? `http://localhost:3001/${folder}/${findEmployee.photo}`
                            : 'http://localhost:3001/uploads/default.png';

                        return (
                            <div key={index} className="bg-white sm:w-[500px]   shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ">
                                {/* Header */}
                                <div className="flex items-center gap-x-4 bg-gray-200 px-4 py-3">
                                    <img
                                        src={imageSource}
                                        alt="Profile"
                                        className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{findEmployee?.username || "Unknown"}</p>
                                        <p className="text-sm text-gray-600">{findEmployee?.fullname || "No Name"}</p>
                                    </div>
                                </div>

                                {/* Video */}
                                <div className="relative group">
                                    <video className="w-full h-[600px]" controls>
                                        <source src={`http://127.0.0.1:3001/PostPhoto/${post.photo}`} type="video/mp4" />
                                    </video>
                                </div>

                                {/* Footer (Like & Comment) */}
                                <div className="flex justify-between items-center px-6 py-3 bg-gray-200">
                                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
                                        <ThumbsUp size={22} />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition">
                                        <MessageSquareText size={22} />
                                        <span>Comment</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500">لا توجد منشورات حتى الآن.</p>
                )}
            </div>
        </div>
    );
}
