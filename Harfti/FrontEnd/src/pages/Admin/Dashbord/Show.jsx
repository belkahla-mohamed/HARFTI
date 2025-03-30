"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Show() {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios
      .post(`http://127.0.0.1:3001/user/dashUser/show`, { id })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.user)
        } else {
          setMessage(res.data.message)
        }
      })
      .catch((error) => {
        setMessage("An error occurred while fetching user data")
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="container  mx-auto py-10  max-w-2xl">
        <div className="bg-white rounded-lg mt-20 shadow-md overflow-hidden">
          <div className="p-6 pb-4">
            <div className="h-8 w-1/3 mb-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-[200px] bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-[150px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (message) {
    return (
      <div className="container mx-auto py-10 max-w-2xl">
        <div className="bg-red-50 border-l-4 mt-40 border-red-500 p-4 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700">{message}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto  py-10 max-w-2xl">
      {user && (
        <div className="bg-white rounded-lg mt-20 shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            < h2 className="text-xl font-semibold text-gray-800">{user.role.toUpperCase()} PROFILE</h2>
            <p className="text-sm text-gray-500">Detailed information about {user.username}</p>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={`http://localhost:3001/EmployeePhotos/${user.photo}`}
                  alt={user.fullname}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 font-medium hidden">
                  {getInitials(user.fullname)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{user.fullname}</h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-800">{user.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="text-sm text-gray-800">{user.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-gray-200 my-4"></div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Services</p>
                {user.service && user.service.length ? (
                  <div className="flex flex-wrap gap-2">
                    {user.service.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No services added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

