import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { CircularProgress } from '@mui/material';
import { downloadDataFromFireStore } from '../backend/firebaseFirestore';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../backend/firebase';

function ProfileComponent() {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [postIds, setPostIds] = useState([]);
  const [posts, setPosts] = useState([]);

  // get user data 
  useEffect(() => {
    const downloadAndSetUserData = async () => {
      // console.log(user.uid);
      await downloadDataFromFireStore("users", user.uid, setUserData, setPostIds);
    }
    downloadAndSetUserData();
  }
    , [user, loading]);

  useEffect(() => {
    let tempArray = [];
    // console.log(postIds);
    postIds?.map(async (postId, idx) => {
      const ref = doc(db, "posts", postId);
      const observer = (doc) => {
        tempArray.push(doc.data());
        setPosts([...tempArray]);
      }
      const unsub = onSnapshot(ref, observer);

      return () => {
        unsub();
      }
    })
  }, [postIds])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div>
      <Navbar userData={userData} />
      <div>
        <div className="profile-user-info">
          <div className="profile-image">
            <img
              src={userData?.photoURL}
              alt="profilePic"
              height={'100px'}
              width={'100px'}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className="user-text-info">
            <h3>{userData?.name}</h3>
            <h3>Posts: {userData?.posts?.length}</h3>
          </div>
        </div>
        <hr />
        <div className="profile-videos">
          {
            posts.map((post, idx) => (
              <video key={idx} src={post.postURL}></video>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent