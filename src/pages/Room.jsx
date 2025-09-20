import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  
  const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();
  const { socket } = useSocket();

  const [myStream, setMyStream] = useState(null);

  // Get media stream
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);

      // 🔗 Attach tracks to peer connection
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });
    } catch (err) {
      console.error("❌ Failed to get media:", err);
    }
  }, [peer]);

  // Handle new user joined
  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("🟢 New user joined room:", emailId);

      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  // Handle incoming call
  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("📞 Incoming call from:", from, offer);

      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket]
  );

  // Handle call accepted
  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("✅ Call got accepted", ans);
      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  // Setup socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

  // Init media on mount
  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  return (
    <div className="text-white bg-zinc-900 h-screen flex flex-col justify-center items-center space-y-4">
      <h1 className="text-3xl font-bold">Room</h1>

      {myStream ? (
        <ReactPlayer
          url={myStream}
          playing
          muted // so you don't get echo from your own mic
          height="300px"
          width="400px"
        />
      ) : (
        <p className="text-gray-400">🎥 No media device found</p>
      )}
    </div>
  );
};

export default Room;
