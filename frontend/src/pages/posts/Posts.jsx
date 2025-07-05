import axios from "axios";
import { Bookmark, MessageSquareText, Pencil, ThumbsUp, Trash2, EllipsisVertical, SendHorizontal, ImagePlus, CopyPlus } from "lucide-react"; // Added EllipsisVertical
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);

    const [likedPosts, setLikedPosts] = useState({});
    const [savedPosts, setSavedPosts] = useState({});
    const userID = JSON.parse(sessionStorage.getItem('userID')) ?? "";
    const socket = useRef(null);
    const [render, setRender] = useState(true);
    const [menuIndex, setMenuIndex] = useState(null);
    const [commentText, setCommentText] = useState({});
    const [Index, setIndex] = useState();
    const [theme, setTheme] = useState("firefly");


    useEffect(() => {
        axios.get('https://harftibackend-production.up.railway.app/user/users')
            .then((res) => {
                if (res.data.status === "success") {
                    setUsers(res.data.users)
                }
            }).catch((error) => console.error("Error fetching users:", error));
    }, [])


    useEffect(() => {
        // Fetch posts and employees
        axios.get('https://harftibackend-production.up.railway.app/post/PostEmployee')
            .then((res) => {
                if (res.data.status === "success") {
                    const postsWithLikes = res.data.posts.map(post => ({
                        ...post,
                        likes: post.likes || [],
                        saves: post.saves || []
                    }));
                    setPosts(postsWithLikes);
                    setEmployees(res.data.employees);

                    // Initialize likedPosts and savedPosts state
                    const initialLikedPosts = {};
                    const initialSavedPosts = {};
                    postsWithLikes.forEach(post => {
                        initialLikedPosts[post._id] = post.likes.includes(userID);
                        initialSavedPosts[post._id] = post.saves.includes(userID);
                    });
                    setLikedPosts(initialLikedPosts);
                    setSavedPosts(initialSavedPosts);
                }
            })
            .catch((error) => console.error("Error fetching posts:", error));

        // Socket.IO setup
        socket.current = io("https://harftibackend-production.up.railway.app");

        socket.current.on("newPost", (newPost) => {
            setPosts((prevPosts) => [{ ...newPost, likes: newPost.likes || [] }, ...prevPosts]);
        });

        socket.current.on("postLiked", (updatedPost) => {
            setPosts((prevPosts) =>
                prevPosts.map(post =>
                    post._id === updatedPost._id ? { ...updatedPost, likes: updatedPost.likes || [] } : post
                )
            );
        });

        socket.current.on("postSaved", (updatedPost) => {
            setPosts((prevPosts) =>
                prevPosts.map(post =>
                    post._id === updatedPost._id ? { ...updatedPost, saves: updatedPost.saves || [] } : post
                )
            );
        });

        return () => {
            socket.current.disconnect();
        };
    }, [userID, render]);

    const handleLike = async (postID) => {
        try {
            if(!userID){
                toast.error("You must be logged in to like a post.");
                return;
            }
            const res = await axios.post(`https://harftibackend-production.up.railway.app/post/like/${postID}`, { userID });
            if (res.data.status === "success" && res.data.postLiked) {
                socket.current.emit("likePost", res.data.postLiked);
                setRender(!render); // Trigger re-render
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleSave = async (postID) => {
        try {
            if(!userID){
                toast.error("You must be logged in to like a post.");
                return;
            }
            const res = await axios.post(`https://harftibackend-production.up.railway.app/post/save/${postID}`, { userID });
            if (res.data.status === "success" && res.data.postSaved) {
                socket.current.emit("savePost", res.data.postSaved);
                setRender(!render); // Trigger re-render
            }
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const handleCommentSubmit = async (postID) => {
        if(!userID){
                toast.error("You must be logged in to like a post.");
                return;
            }
        if (!commentText[postID]) return; // Don't allow empty comments

        try {
            const res = await axios.post(`https://harftibackend-production.up.railway.app/post/comment/${postID}`, {
                userID,
                text: commentText[postID]
            });

            if (res.data.status === "success") {
                setCommentText('')
                setRender(!render); // Trigger re-render
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    function openComments(index) {
        setIndex(prevIndex => prevIndex === index ? null : index);
    }
    const particlesInit = useCallback(async (engine) => {
        console.log(engine); // ✅ تحقق مما إذا كان `engine` يتم تمريره بشكل صحيح
        await loadSlim(engine); // 🔹 استخدم loadSlim بدل loadFull
    }, []);

    async function handleDeletePost(postID) {
        const res = await axios.delete(`https://harftibackend-production.up.railway.app/post/delete/${postID}`)
        if (res.data.status === "success") {
            toast.success(res.data.message);
            setRender(!render); // Trigger re-render
        }
    }

    const [expanded, setExpanded] = useState({});

    const toggleExpand = (postId) => {
        setExpanded((prev) => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };



    return (
        <div className="w-full min-h-screen py-8">
            <div>
                {/* 🎨 الجزيئات */}
                <Particles

                    init={particlesInit}
                    style={{
                        position: "fixed",
                        top: "20px",
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: -1, // يجعل الجزيئات خلف المحتوى
                    }}
                    options={{
                        background: {
                            color: "#333333",
                        },
                        particles: {
                            number: { value: 120 },
                            move: { enable: true, speed: 0.5 },
                            shape: { type: "star" },
                            opacity: { value: 0.9, random: false },
                            size: { value: 2, random: true },
                            color: { value: "#fb923c" },
                            links: { enable: false },
                        },
                    }}
                />


            </div>
            {users?.find((user) => user._id === userID)?.role === "employee" &&
                <div className="fixed sm:z-0 z-50 right-0 sm:translate-x-29 translate-x-25 w-full cursor-pointer">
                    <Link className="flex justify-end" to={"/Posts/AddPost"}>
                        <div className="flex items-center rounded-2xl shadow-[0px_0px_5px_gray] text-[#333333] gap-x-2 px-2 py-1 bg-orange-400 border-2 border-orange-400 ease-in-out hover:-translate-x-28 sm:hover:-translate-x-32 transition-all">
                            <CopyPlus className="sm:w-15 sm:h-15 w-7 h-7" />
                            <p className="sm:text-2xl text-xl font-bold">Add Post</p>
                        </div>
                    </Link>
                </div>
            }


            <div className="w-full max-w-4xl mx-auto grid justify-center gap-6">
                {posts.length ? (
                    posts.map((post, index) => { // Added index parameter
                        const findEmployee = employees.find(employee => employee._id === post.userID);
                        function handleImage(user) {
                            const folder = user?.photo?.startsWith('avatar') ? 'uploads' : 'EmployeePhotos';
                            const imageSource = user?.photo
                                ? `https://harftibackend-production.up.railway.app/${folder}/${user.photo}`
                                : 'https://harftibackend-production.up.railway.app/uploads/default.png';
                            return (imageSource)
                        }


                        return (
                            <div key={post._id} className="bg-black sm:w-[500px] relative shadow-[0px_0px_5px_gray] rounded-2xl overflow-hidden transition-all duration-300">
                                <div className="flex w-full justify-between items-center bg-gray-200 px-4 py-3 relative">
                                    <Link to={findEmployee?._id === userID ? "/Profile" : `/Posts/ProfileEmployee/${findEmployee?.username}`} className="flex gap-x-4 items-center" >
                                        <img
                                            src={handleImage(findEmployee)}
                                            title={`Profile ${findEmployee?.username}`}
                                            alt="Profile"
                                            className="sm:w-14 sm:h-14 w-9 h-9 rounded-full border-2 border-white shadow-md hover:shadow-sm"
                                        />
                                        <div className="w-full">
                                            <p className="sm:text-lg text-md font-semibold">{findEmployee?.username || "Unknown"}</p>
                                            <p className="sm:text-sm text-sm text-gray-600">{findEmployee?.fullname || "No Name"}</p>
                                        </div>
                                    </Link>


                                    {/* Menu Button */}
                                    {findEmployee?._id === userID && (
                                        <div
                                            className={`flex cursor-pointer rounded-full p-2 ${menuIndex === index ? "bg-gray-300" : ""} hover:bg-gray-300 justify-end relative`}
                                            onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                                        >
                                            <EllipsisVertical /> {/* Fixed EllipsisVertical usage */}
                                            {menuIndex === index && (
                                                <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md w-48 p-2 z-10">
                                                    <button onClick={() => handleDeletePost(post._id)} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left">
                                                        <Trash2 size={'18px'} />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                                <div className="bg-gray-200">
                                    <div className=" px-4">
                                        <p className="text-gray-800 w-[100%] break-words">
                                            {expanded[post._id] || post.description.length <= 60
                                                ? post.description
                                                : post.description.slice(0, 60) + "..."}
                                        </p>
                                        {post.description.length > 60 && (
                                            <button
                                                onClick={() => toggleExpand(post._id)}
                                                className="text-blue-500 hover:underline mt-2"
                                            >
                                                {expanded[post._id] ? "See less" : "See more"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="relative group">
                                    <video className="w-full sm:h-[600px] h-[400px]" controls>
                                        <source src={`https://harftibackend-production.up.railway.app/Videos/${post.photo}`} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="flex justify-between items-center gap-x-4 sm:gap-x-0 px-6 py-3 bg-gray-200">
                                    {/* Like Button */}
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className={`flex items-center gap-2 ${likedPosts[post._id] ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition`}
                                    >
                                        <span className={`${likedPosts[post._id] ? 'bg-blue-300' : "bg-gray-300"} p-2 rounded-full`}>
                                            <ThumbsUp className="sm:size-[22px] size-[18px]" />
                                        </span>
                                        <span>{post.likes?.length || 0} Likes</span>
                                    </button>

                                    {/* Comment Button */}
                                    <button onClick={() => openComments(index)} className="flex items-center gap-2 text-gray-700 hover:text-gray-600 transition">
                                        <span className="bg-gray-300 p-2 rounded-full">
                                            <MessageSquareText className="sm:size-[22px] size-[18px]" />
                                        </span>
                                        <span>Comment</span>
                                    </button>

                                    {/* Save Button */}
                                    <button
                                        onClick={() => handleSave(post._id)}
                                        className={`flex items-center gap-2 ${savedPosts[post._id] ? 'text-green-600' : 'text-gray-700'} hover:text-green-600 transition`}
                                    >
                                        <span className={`${savedPosts[post._id] ? 'bg-green-300' : "bg-gray-300"} p-2 rounded-full`}>
                                            <Bookmark className="sm:size-[22px] size-[18px]" />
                                        </span>
                                        <span>{savedPosts[post._id] ? "Saved" : "Save"}</span>
                                    </button>
                                </div>
                                {index === Index &&
                                    <div className="px-6 py-3 bg-white">

                                        {/* Existing Comments */}
                                        {post.comments && post.comments.length > 0 && (
                                            <div className="mb-2 space-y-2 ">
                                                {post.comments.map((comment, index) => (
                                                    comment.userID === userID ? (
                                                        <div className="flex w-full flex-col items-end justify-end ">
                                                            <div className="bg-gray-100 shadow-md p-2 w-[50%] rounded-2xl ">
                                                                <p key={index} className="text-gray-800 flex justify-end items-center text-end space-x-2">
                                                                    <strong>{users?.find((user) => user._id === comment.userID)?.username || "Unknown"}</strong>
                                                                    <img src={handleImage(users?.find((user) => user._id === comment.userID))}
                                                                        alt="Profile"
                                                                        className="w-8 h-8 rounded-full shadow-md" />
                                                                </p>
                                                                <p className="break-words">{comment.text}</p>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div className="flex w-full flex-col justify-end ">
                                                            <div className="bg-gray-100 shadow-md p-2 w-[50%] rounded-2xl ">
                                                                <p key={index} className="text-gray-800 flex items-center space-x-2">
                                                                    <img src={handleImage(users?.find((user) => user._id === comment.userID))}
                                                                        alt="Profile"
                                                                        className="w-8 h-8 rounded-full shadow-md" />
                                                                    <strong>{users?.find((user) => user._id === comment.userID)?.username || "Unknown"}</strong>
                                                                </p>
                                                                <p className="break-words pl-8">{comment.text}</p>
                                                            </div>

                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}


                                        {/* Input for new comment */}
                                        <div className="flex items-center bg-gray-300 px-2 rounded-2xl space-x-2">
                                            <textarea
                                                rows={1}
                                                type="text"
                                                placeholder="Write a comment..."
                                                value={commentText[post._id] || ""}
                                                onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                                                className="flex-1 px-3 py-2 overflow-hidden resize-none rounded-md border border-gray-300 outline-none"
                                            />
                                            <button onClick={() => handleCommentSubmit(post._id)} className="text-blue-500 hover:text-blue-700">
                                                <SendHorizontal size={22} />
                                            </button>
                                        </div>
                                    </div>
                                }


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