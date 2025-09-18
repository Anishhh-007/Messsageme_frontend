import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addRequest } from "../redux/slices/requestSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_SERVER_URL
  const location = useLocation()
  const dispatch = useDispatch()
  const requests = useSelector(state => state.request)
  const [disable, setDisable] = useState(false)

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${API_URL}/connection/request`, { withCredentials: true })

      if (res.status === 200) console.log("Yo chaldaita chha"); dispatch(addRequest(res.data))


    } catch (error) {
      toast.error(error.message)
    }
  }



  const handelAccept = async (id) => {
    try {

      const res = await axios.post(`${API_URL}/connection/accept/${id}`, {}, { withCredentials: true })

      if (res.status === 200) toast.success("Request accepted")
      else {
        toast.error("Cannot make saame request again")
      }
      setDisable(true)

    } catch (error) {

      console.log(error.message);

    }
  }
  const handelReject = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/connection/reject/${id}`, {}, { withCredentials: true })

      if (res.status === 200) toast.error("Request rejected")
      setDisable(true)

    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (location.pathname === "/profile") fetchConnections();

  }, [])


  return (
    <div className="max-w-full mt-6 flex items-center justify-center">
      <ToastContainer autoClose={3000} position="top-right" closeOnClick />
      <div className="w-[80%] h-[80vh] flex gap-6">
        {/* User info */}
        <div className="flex flex-col w-[40%] h-full bg-gray-100 rounded-2xl shadow-md p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-3 border-b pb-2">User Info</h2>
          {[
            { label: "First Name", value: user.firstName || "" },
            { label: "Last Name", value: user.lastName || "" },
            { label: "Email", value: user.email || "" },
            { label: "Gender", value: user.gender || "" },
            { label: "Bio", value: user.bio || "No bio added" },
          ].map((field, i) => (
            <div key={i} className="flex flex-col mb-3">
              <label className="font-semibold text-sm">{field.label}</label>
              <input
                readOnly
                value={field.value}
                className="px-3 py-2 mt-1 rounded-md border border-gray-300 bg-white focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Profile photo + bio */}
        <div className="flex flex-col w-[30%] h-full bg-blue-50 rounded-2xl shadow-md items-center justify-center p-4">
          <img
            className="object-cover h-[150px] w-[150px] rounded-full border-4 border-blue-300 shadow-md"
            src={
              user.image
                ? `data:image/png;base64,${user.image}`
                : "./default-avatar.png"
            }
            alt="profile"
          />
          <h3 className="mt-4 text-xl font-bold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="mt-2 text-center text-gray-600 text-sm">
            {user.bio || "This user hasn’t added a bio yet."}
          </p>
        </div>

        {/* Connection requests */}
        <div className="flex flex-col w-[30%] h-full bg-red-50 rounded-2xl shadow-md p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-3 border-b pb-2">
            Connection Requests
          </h2>

          {Array.isArray(requests) && requests.length > 0 ? (
            requests.map((items, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm mb-2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                    src={
                      items.from?.image
                        ? `data:image/jpeg;base64,${items.from.image}`
                        : "/default-avatar.png"
                    }
                    alt="request user"
                  />
                  <div>
                    <p className="font-semibold">
                      {items.from?.firstName} {items.from?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">Wants to connect</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => user.id === items.from._id ? handelAccept(items.to) : handelAccept(items.from._id)}
                    disabled={disable}
                    className={`px-3 py-1 rounded-md text-white 
          ${disable
                        ? "bg-gray-400 cursor-not-allowed opacity-50"
                        : "bg-green-500 hover:bg-green-600 cursor-pointer"
                      }`}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => user.id === items.from._id ? handelReject(items.to) : handelReject(items.from._id)}
                    disabled={disable}
                    className={`px-3 py-1 rounded-md text-white 
          ${disable
                        ? "bg-gray-400 cursor-not-allowed opacity-50"
                        : "bg-red-500 hover:bg-red-600 cursor-pointer"
                      }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No pending requests</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;

