import React from 'react'
import { useSelector } from 'react-redux'

const Righthome = () => {
  const user = useSelector((state) => state.targetID)

  // Helper to capitalize first letter
  const capitalize = (str) => {
    if (!str) return "";
   return str?.charAt(0).toUpperCase() + str?.slice(1)
  }
  return (
    <div className="h-full w-[25%] bg-blue-50 flex items-center  rounded-sm justify-center">
      <div className="flex flex-col items-center">
        <img
          src={
            user?.image
              ? `data:image/png;base64,${user.image}`
              : '/default-avatar.png'
          }
          alt={`${user.firstName} ${user.lastName}`}
          className="h-32 w-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
        />
        <p className="mt-4 text-lg font-bold text-blue-900">
          {capitalize(user?.firstName) || "User"} {capitalize(user?.lastName) || ""}
        </p>
      </div>
    </div>
  )
}

export default Righthome
