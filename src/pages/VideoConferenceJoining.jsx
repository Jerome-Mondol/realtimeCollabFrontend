import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../providers/Socket';

const VideoConferenceJoining = ({ user }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [roomId, setRoomId] = useState('');
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    // Listen for server confirmation
    socket.on("joined-room", ({ roomId }) => {
      console.log("📩 Server confirmed join:", roomId);
      navigate(`/room/${roomId}`);
    });

    // Optional: listen for when others join
    socket.on("user-joined", ({ emailId }) => {
      console.log(`👤 ${emailId} joined the room`);
    });

    return () => {
      socket.off("connect");
      socket.off("joined-room");
      socket.off("user-joined");
    };
  }, [socket, navigate]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomId || !email) {
      alert("Please enter both Email and Room Code");
      return;
    }
    socket.emit("join-room", { emailId: email, roomId });
  };

  return (
    <div className='bg-zinc-900 h-screen flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-white text-center py-5'>Join Video Conference</h1>
      <form onSubmit={handleJoinRoom} className='w-[30%] mx-auto flex justify-center flex-col h-[50%] gap-4'>
        <h1 className='text-white font-semibold text-xl'>Welcome {user}</h1>

        <input
          type="email"
          placeholder='Email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='bg-black p-5 w-[100%] text-white'
        />

        <input
          type="text"
          name='code'
          placeholder='Enter Room Code'
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          className='bg-black p-5 w-[100%] text-white'
        />

        <button
          type='submit'
          className='w-[100%] bg-blue-800 text-gray-300 py-3 shadow-sm cursor-pointer rounded-sm'
        >
          Join Meeting
        </button>
      </form>
    </div>
  );
};

export default VideoConferenceJoining;
