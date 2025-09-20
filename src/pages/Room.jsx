import React, { useEffect } from 'react'
import { useSocket } from '../providers/Socket'

const Room = () => {


    const handleNewUserJoined = (data) => {
        const { emailId } = data;
        console.log("New user joined room", emailId)

    }

    const {socket} = useSocket();
    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
    })



  return (
    <div>
      Room
    </div>
  )
}

export default Room
