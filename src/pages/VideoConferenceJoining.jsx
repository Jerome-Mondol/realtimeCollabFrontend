import { useEffect } from 'react';
import { useSocket } from '../providers/Socket';

const VideoConferenceJoining = ({ user }) => {
  const { socket } = useSocket();

  useEffect(() => {
  if (!socket) return;

  socket.on("connect", () => {
    console.log("✅ Connected:", socket.id);
    socket.emit("join-room", { roomId: 1, emailId: "test@test.com" });
  });

  return () => {
    socket.off("connect");
  };
}, [socket]);



  return (
    <div className='bg-zinc-900 h-screen flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-white text-center py-5'>Join Video Conference</h1>
      <form className='w-[30%] mx-auto flex justify-center flex-col h-[50%] gap-4'>
        <h1 className='text-white font-semibold text-xl'>Welcome {user}</h1>

        <input 
          type="email"
          placeholder='Email'
          name='email'
          className='bg-black p-5 w-[100%] text-white'
        />    

        <input 
          type="text"
          name='code'
          placeholder='Enter Room Code'
          className='bg-black p-5 w-[100%] text-white' 
        />

        <button type='submit' className='w-[100%] bg-blue-800 text-gray-300 py-3 shadow-sm cursor-pointer rounded-sm'>
          Join Meeting
        </button>
      </form>
    </div>
  );
};

export default VideoConferenceJoining;
