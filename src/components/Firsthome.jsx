import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTargetID } from "../redux/slices/targetIDSlice";

const Firsthome = () => {
  const friends = useSelector((state) => state.friends); // conversations
  const currentUser = useSelector((state) => state.user); // logged-in user
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.id);

  // Helper to capitalize first letter
  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  const handleOnClick = (id, fn, ln, image) => {
    try {
      dispatch(
        addTargetID({
          id,
          firstName: fn,
          lastName: ln,
          image,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ Extract unique users (excluding logged-in user)
  const uniqueUsers = useMemo(() => {
    if (!Array.isArray(friends)) return [];

    return Array.from(
      new Map(
        friends.map((item) => {
          const person =
            item.from._id === currentUser.id  ? item.to : item.from;
          return [person._id, person];
        })
      ).values()
    );
  }, [friends, currentUser._id]);


  return (
    <div className="w-[25%] h-full bg-blue-50 p-4">
      {uniqueUsers.length > 0 ? (
        uniqueUsers.map((otherUser) => (
          <div
            key={otherUser._id}
            onClick={() =>
              handleOnClick(
                otherUser._id,
                otherUser.firstName,
                otherUser.lastName,
                otherUser.image
              )
            }
            className="flex items-center gap-3 bg-blue-100 p-3 rounded-xl shadow-md mb-3 hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
          >
            <img
              src={
                otherUser?.image
                  ? `data:image/png;base64,${otherUser?.image}`
                  : "./default-avatar.png"
              }
            
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-300 shadow-sm"
            />
            <p className="text-blue-900 font-semibold text-sm">
              {capitalize(otherUser.firstName)} {capitalize(otherUser.lastName)}
            </p>
          </div>
        ))
      ) : (
        <p className="text-blue-500 text-sm">No friends yet</p>
      )}
    </div>
  );
};

export default Firsthome;
