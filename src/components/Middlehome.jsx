import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import createSocketConnection from "../utils/socket";
import axios from "axios";

const Middlehome = () => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user);
  const targetUser = useSelector((state) => state.targetID);
  const [input, setInput] = useState("");
  const socketRef = useRef(null); // ✅ keep socket here
  const messagesEndRef = useRef(null); // ✅ for auto scroll

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userID: user?.id, targetID: targetUser?.id });

    socket.on("Message_Received", ({ user: senderID, targetID, text }) => {
        if (senderID === user?.id) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          fromMe: senderID === user?.id,
          sender: senderID,
          text,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, targetUser]);

  const handleSend = () => {
    if (!input.trim()) return;

    socketRef.current.emit("sendMessage", {
      user: user?.id,
      targetID: targetUser?.id,
      text: input,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { fromMe: true, sender: user?.id, text: input },
    ]);

    setInput("");
  };

 
  const fetchMessages = async( ) =>{
    try {
      const chat = await axios.get(`${import.meta.env.VITE_SERVER_URL}/chat/${user?.id}/${targetUser?.id}` , {withCredentials : true})

      if(chat.status === 200){
      const chatMessage = chat?.data?.message.map((msg) =>{
        return {
          fromMe: msg?.senderID === user?.id,
          sender: msg?.senderID,
          text : msg?.text,
        }
      })      
      setMessages(chatMessage)
    }
      

    } catch (error) {
      console.log("Message fetch frontend error " + error);
      
    }
  }

  useEffect(() =>{
    fetchMessages()
  } , [targetUser])

 useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="w-[50%] h-full rounded-sm flex flex-col bg-gradient-to-b from-blue-200 to-blue-100">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-4 ${
              msg.fromMe ? "items-end" : "items-start"
            }`}
          >
            {!msg.fromMe && (
              <span className="text-xs text-gray-300 mb-1">{msg.sender}</span>
            )}

            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-white shadow-md ${
                msg.fromMe
                  ? "bg-blue-500 rounded-br-none"
                  : "bg-gray-600 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* anchor for auto scroll */}
      </div>

      {/* Input field */}
      <div className="p-3 bg-blue-400 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-xl outline-none bg-blue-100 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:cursor-pointer hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Middlehome;
