import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUserData } from "../redux/slices/userSlice";
import { addSearch } from "../redux/slices/searchSlice";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // confirmation modal
  const data = useSelector((state) => state.user);
  const searchUser = useSelector((state) => state.search);

  const dropdownRef = useRef(null);

  const handelLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });
      if (res) {
        dispatch(clearUserData());
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error :" + error.message);
    }
  };

  const handelSearch = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/search/user`,
        {
          name: search,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(addSearch(res.data));
      }
    } catch (error) {
      toast.error("No user found");
    }
  };

  const handelConnection = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/connection/user/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Connection request sent");
      }
    } catch (error) {
      toast.error("Request already sent");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-[100px] max-w-full flex justify-center items-center relative">
      <ToastContainer autoClose={3000} position="top-right" closeOnClick />
      <div className="flex w-[70%] justify-between items-center relative">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-[120px] object-cover hover:cursor-pointer"
          />
        </Link>

        {/* Links + Search */}
        <div className="flex justify-between items-center w-[50%] text-lg font-medium gap-6">
          {/* Search bar */}
          <div className="flex items-center gap-2 relative w-[60%] max-w-md">
            <input
              onClick={() => setOpen(!open)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition font-medium"
              onClick={handelSearch}
            >
              Search
            </button>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Profile
          </Link>

          {/* Logout */}
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-[90px] right-[20%] w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-20"
        >
          <div className="p-2 max-h-[250px] overflow-y-auto">
            {Array.isArray(searchUser) && searchUser.length > 0 ? (
              searchUser.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      src={
                        item.image
                          ? `data:image/png;base64,${item?.image}`
                          : "./default-avatar.png"
                      }
                      alt="user"
                    />
                    <div className="text-sm font-medium text-gray-800">
                      {item.firstName.charAt(0).toUpperCase() +
                        item.firstName.slice(1)}{" "}
                      {item.lastName.charAt(0).toUpperCase() +
                        item.lastName.slice(1)}
                    </div>
                  </div>
                  <img
                    onClick={() => handelConnection(item._id)}
                    className="h-6 w-6 hover:scale-110 transition"
                    src="./add_icon.png"
                    alt="add connection"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No results found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[320px] text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-full hover:cursor-pointer bg-gray-200 text-gray-700 font-medium hover:bg-green-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handelLogout}
                className="px-4 py-2 rounded-full hover:cursor-pointer bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
