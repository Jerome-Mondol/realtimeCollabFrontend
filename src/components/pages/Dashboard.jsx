import React from 'react'

const Dashboard = ({ token }) => {
  if (!token || !token.user) {
    return <div>Loading...</div>;
  }

  const fullName = token.user.user_metadata?.full_name || "User";

  return (
    <div>
      Welcome Back, {fullName}
    </div>
  )
}

export default Dashboard;
