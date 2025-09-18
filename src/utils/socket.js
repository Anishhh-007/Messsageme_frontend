import io from 'socket.io-client'

  const createSocketConnection = () =>{
    return io(import.meta.env.VITE_SERVER_URL ,{
      path: "/socket.io",
  transports: ["websocket", "polling"]
    } )
}

export default createSocketConnection
