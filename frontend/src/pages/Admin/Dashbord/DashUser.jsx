

import axios from "axios"
import { useEffect, useState } from "react"
import { Eye, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DashUser() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3001/user/dashUser")
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.users)
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
      <div className="overflow-x-auto w-full max-w-6xl table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Service</th>
              <th className="w-full flex justify-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((e, index) => (
                <tr key={e._id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td>{index + 1}</td>
                  <td>{e.fullname}</td>
                  <td>{e.username}</td>
                  <td>{e.email}</td>
                  <td>{e.age ? e.age : "N/A"}</td>
                  <td>{e.phone ? e.phone : "N/A"}</td>
                  <td>
                    {e.service
                      ? e.service
                        .map((s, i) => (
                          <span key={i} className="service-tag">
                            {s ? s : "N/A"}
                          </span>
                        ))
                        .slice(0, 3)
                      : "N/A"}
                    {e.service && e.service.length > 3 && <span className="service-more">+{e.service.length - 3}</span>}
                  </td>
                  <td className="flex gap-2">
                    <button className="delete-btn" onClick={() => Supprimer(e.username)} >
                      <Trash2 size={15} />
                      <span>Delete </span>
                    </button>
                    <button className="show-btn" onClick={() => Show(e._id)} >
                      <Eye size={15} />
                      <span>Show </span>
                    </button>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }

          .table-container {
            animation: fadeIn 0.5s ease-out forwards;
          }

          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          th, td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }

          th {
            background-color: #f3f4f6;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            color: #4b5563;
            position: relative;
            overflow: hidden;
            
          }

          th::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.4) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
            pointer-events: none;
          }

          tbody tr {
            transition: background-color 0.2s, transform 0.2s;
            animation: slideIn 0.5s ease-out forwards;
            animation-fill-mode: both;
          }

          tbody tr:hover {
            background-color: #f9fafb;
            transform: translateX(5px);
          }

          tbody tr:last-child td {
            border-bottom: none;
          }

          .service-tag {
            display: inline-block;
            background-color: #e5e7eb;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 0.75rem;
            margin-right: 4px;
            margin-bottom: 4px;
            transition: all 0.3s ease;
          }

          .service-tag:hover {
            background-color: #d1d5db;
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .service-more {
            display: inline-block;
            background-color: #d1d5db;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 0.75rem;
            transition: all 0.3s ease;
          }

          .service-more:hover {
            animation: pulse 1s infinite;
          }

          .delete-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 6px 6px;
            background-color: #fee2e2;
            color: #ef4444;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .delete-btn:hover {
            background-color: #fecaca;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
          }

          .delete-btn:active {
            transform: translateY(0);
          }

          .delete-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(239, 68, 68, 0.3);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }

          .delete-btn:hover::after {
            animation: ripple 1s ease-out;
          }


          



.show-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 6px;
  background-color: #dbeafe; /* Bleu clair */
  color: #3b82f6; /* Bleu principal */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.show-btn:hover {
  background-color: #bfdbfe; /* Bleu plus vif au survol */
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.show-btn:active {
  transform: translateY(0);
}

.show-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(59, 130, 246, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.show-btn:hover::after {
  animation: ripple 1s ease-out;
}





          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 0.5;
            }
            100% {
              transform: scale(20, 20);
              opacity: 0;
            }
          }
        `}</style>

        <style jsx global>{`
          body {
            background-color: rgb(229 231 235); /* bg-neutral-200 equivalent */
          }
        `}</style>
      </div>
    </div>
  )
}

