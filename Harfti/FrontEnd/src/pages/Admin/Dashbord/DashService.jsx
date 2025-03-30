import axios from "axios";
import { ArrowUpRight, PackagePlus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function DashService() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({});
  const [message, setMessage] = useState("");
  const iconsClass = "w-5 h-5 ";
  const [refreshe, setRefreshe] = useState(false);
  const [open, setOpen] = useState(false);
  const formData = new FormData();

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/services").then((res) => {
      if (res.data.status === "success") {
        setServices(res.data.services);
      } else {
        setMessage(res.data.message);
      }
    });
  }, [refreshe]);

  function Supprimer(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        axios.post('http://127.0.0.1:3001/servicesDelete', { id }).then((res) => {
          if (res.data.status === "success") {
            setMessage(res.data.message);
            setRefreshe(!refreshe);
          } else {
            setMessage(res.data.message);
          }
        });
      }
    });
  }

  function AddService() {
    setOpen(!open);
  }

  function AddNewService() {
    for (const [key, value] of Object.entries(newService)) {
      formData.append(key, value);
    }
    axios.post('http://127.0.0.1:3001/newservices', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
      if (res.data.status === "success") {
        setMessage(res.data.message);
        setRefreshe(!refreshe);
      } else {
        setMessage(res.data.message);
      }
    });
  }

  return (
    <div className="flex  relative w-full h-screen justify-center items-start pt-28">
      {/* Add service form */}
      <div className={`cursor-pointer shadow-xs p-2 fixed right-0 duration-500 transition-all ease-in-out sm:top-30 top-22 z-50 flex flex-col items-center`}>
        <PackagePlus className="size-12 relative translate-x-25 bg-white" onClick={() => setOpen(!open)} />
        <div className={`${open ? 'translate-x-0' : 'translate-x-90'} w-[16em] transition-all bg-gray-300 py-5 px-3 space-y-5 flex flex-col`}>
          <div className="">
            <label htmlFor="l1" className="">Title</label>
            <input 
              type="text" 
              onChange={(e) => setNewService({ ...newService, title: e.target.value })} 
              id="l1" 
              className="bg-gray-700 w-full text-white hover:ring-gray-600 focus:ring-gray-200 transition-all py-1.5 outline-0 rounded-xs shadow px-3.5 ring-1" 
              placeholder="" 
            />
          </div>
          <div className="">
            <div className="w-full flex justify-between pb-1.5">
              <label htmlFor="l2" className="">Icon</label>
              <p className="flex hover:border-b-1 hover:border-blue-600">
                <Link to={'https://lucide.dev/icons/'} className="flex">Go select Icon <ArrowUpRight /></Link>
              </p>
            </div>
            <input 
              type="text" 
              id="l2" 
              onChange={(e) => setNewService({ ...newService, icon: e.target.value })} 
              className="bg-gray-700 w-full text-white hover:ring-gray-600 focus:ring-gray-200 transition-all py-1.5 outline-0 rounded-xs shadow px-3.5 ring-1" 
              placeholder="" 
            />
          </div>
          <div className="">
            <label htmlFor="l3" className="">Description</label>
            <textarea 
              rows={1} 
              onChange={(e) => setNewService({...newService, description: e.target.value })} 
              type="text" 
              id="l3" 
              className="bg-gray-700 w-full overflow-hidden resize-none text-white hover:ring-gray-600 focus:ring-gray-200 transition-all py-1.5 outline-0 rounded-xs shadow px-3.5 ring-1" 
              placeholder="" 
            />
          </div>
          <div className="">
            <label htmlFor="l4" className="">Photo</label>
            <input 
              onChange={(e) => setNewService({...newService, image: e.target.files[0] })} 
              type="file" 
              id="l4" 
              className="bg-gray-700 w-full text-white hover:ring-gray-600 focus:ring-gray-200 transition-all py-1.5 outline-0 rounded-xs shadow px-3.5 ring-1" 
              placeholder="" 
            />
          </div>
          <button 
            className="bg-gray-700 py-1.5 text-white rounded-xs shadow-lg mt-2 hover:shadow-xl transition-all" 
            onClick={AddNewService}
          >
            Add
          </button>
        </div>
      </div>

      {/* Services table */}
      <div className="overflow-x-auto w-full max-w-6xl rounded-xl pb-5 table-container">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-black uppercase bg-gray-100 ">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Icon</th>
              <th className="px-6 py-3" >Description</th>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3" >Action</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((e, index) => {
                const IconComponent = LucideIcons[e.icon]; // Dynamically get the icon component
                return (
                  <tr key={e._id} style={{ animationDelay: `${index * 0.05}s` }} className="odd:bg-white text-gray-800 even:bg-gray-100">
                    <td  scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap " >{index + 1}</td>
                    <td className="px-6 py-4">{e.title}</td>
                    <td className="px-6 py-4">
                      {IconComponent ? React.createElement(IconComponent, { className: iconsClass }) : <p className="text-red-600 text-xs">icon not fonded</p> }
                    </td>
                    <td className="px-6 py-4" >{e.description}</td>
                    <td className="px-6 py-4">
                      <div className="relative h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        {e.image ? (
                          <img
                            src={`http://localhost:3001/servicesPhotos/${e.image}`}
                            alt={e.title}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">No Image</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4" >
                      <div className="flex ">
                        <button className="delete-btn items-center gap-1.5 flex text-red-600 hover:bg-red-600/25 transition-all ease-in-out  p-2 rounded   " onClick={() => Supprimer(e._id)}>
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-6 py-4 text-center py-8 text-gray-500" colSpan="6" >
                  {message || "No services available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* CSS STYLES */}
        
      </div>
    </div>
  );
}