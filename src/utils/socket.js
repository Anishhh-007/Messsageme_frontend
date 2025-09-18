import io from 'socket.io-client'

  const createSocketConnection = () =>{
    return io(import.meta.env.VITE_SERVER_URL)
}

export default createSocketConnection
