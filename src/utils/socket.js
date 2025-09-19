import io from 'socket.io-client'

  const createSocketConnection = () =>{
    return io('/' ,{
      path: "/socket.io",
  transports: ["websocket", "polling"]
    } )
}

export default createSocketConnection
