import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'> Welcome back, {user && user.name}!</h2>
    </div>
  )
}

export default Welcome