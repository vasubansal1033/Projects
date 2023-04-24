import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../backend/firebase';
import Post from './Post';

function Videos({ userData }) {

    const [posts, setPosts] = useState([]);

    // get posts
    useEffect(() => {
        const querySnapshot = query(collection(db, "posts"),
            orderBy("timestamp", "desc"));

        const observer = (snapshot) => {
            let tempArray = [];
            snapshot.docs.map((doc) => {
                tempArray.push(doc.data());
            })
            setPosts([...tempArray]);
        }

        const unsub = onSnapshot(querySnapshot, observer);
        return () => {
            unsub();
        }
    }, []);

    // autopause when not intersecting
    const cb = (entries) => {
        entries.forEach((entry) => {
            let ele = entry.target.childNodes[0];
            ele.play().then(() => {
                if(!ele.paused && !entry.isIntersecting) {
                    ele.pause();
                }
            })
        });
    };
    let observer = new IntersectionObserver(cb, {
        threshold: 0.9
    });

    useEffect(() => {
        const elements = document.querySelectorAll(".post-container");
        elements.forEach((element) => {
            observer.observe(element);
        })
        return () => {
            observer.disconnect();
        }
    }, [posts])

    return (
        <div className="videos-container">
            {
                posts?.map((post, idx) => {
                    return <Post key={idx} postData={post} userData={userData} />
                })
            }
        </div>
    )
}

export default Videos