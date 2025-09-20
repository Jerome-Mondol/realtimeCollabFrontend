import React from 'react'
import VideoConferenceJoining from './VideoConferenceJoining';


const Dashboard = ({ token }) => {
  if (!token || !token.user) {
    return <div>Loading...</div>;
  }

  const fullName = token.user.user_metadata?.full_name || "User";

  return (
    <div>
      <VideoConferenceJoining user={token.user.user_metadata.full_name} />
    </div>
  )
}

export default Dashboard;
