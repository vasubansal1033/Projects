import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Videos from './Videos'
import { AuthContext } from '../context/AuthContext'
import { CircularProgress } from '@mui/material'
import { downloadDataFromFireStore } from '../backend/firebaseFirestore'

function Feed() {

  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  // get user data 
  useEffect(() => {
    const downloadAndSetUserData = async () => {
      // console.log(user.uid);
      await downloadDataFromFireStore("users", user.uid, setUserData);
    }
    downloadAndSetUserData();
  }
    , [user]);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className='feed-container'>
      <Navbar userData={userData} />
      <Upload userData={userData} />
      <Videos userData={userData} />
    </div>
  )
}

export default Feed