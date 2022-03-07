import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { db } from '../firebase';
import Navbar from './Navbar'
function ProfileComp() {

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);
    const [postIds, setPostIds] = useState([]);
    // console.log(user);

    useEffect(() => {
        // console.log(user.uid);
        const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
            // console.log(doc.data());
            setUserData(doc.data());
            setPostIds(doc.data().posts);
        })
        return () => {
            unsub();
        }
    }, [user])

    useEffect(() => {
        let tempArray = [];
        postIds.map(async (postId, idx) => {
            const unsub = onSnapshot(doc(db, 'posts', postId), (doc) => {
                tempArray.push(doc.data());
                setPosts([...tempArray]);
            })
            return () => {
                unsub();
            }
        })
    }, [postIds]);
    // console.log(userData);
    // console.log(posts);

    return (
        <div>
            <Navbar userData={userData} />
            <div>
                <div className='profile-upper'>
                    <img src={userData.photoURL}
                        style={{ height: '8rem', width: '8rem', borderRadius: '50%', boxShadow: '0.3rem 0.3rem 1rem 0.3rem grey', objectFit: 'cover' }}
                    />
                    <div>
                        <h1>{userData.name}</h1>
                        <p>{posts.length} posts</p>
                    </div>
                </div>
                <hr style={{ marginTop: '0.5rem' }} />
                <div className='profile-videos'>
                    {
                        posts.map((post) => {
                            return (
                                <video key={post.postId} src={post.postURL}></video>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileComp