import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/auth';
import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid'

function AddComment({postData}) {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // console.log(user.uid);
        const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          // console.log(doc.data());
          setUserData(doc.data());
        })
        return () => {
          unsub();
        }
      }, [user])

    const [text, setText] = useState('');
    const postComment = async () => {
        console.log(userData);
        let obj = {
            userPic: userData.photoURL,
            userName: userData.name,
            commentText: text
        };
        let uid = uuidv4();
        await setDoc(doc(db, 'commentCollection', uid), obj);
        await updateDoc(doc(db, 'posts', postData.postId), {
            comments: arrayUnion(uid)
        })
        setText('');
    }
    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center'
        }}>
            <TextField size='small' id="filled-basic" label="Add your comment" variant="outlined"
                value={text}
                onChange={(e) => { setText(e.target.value) }}
            />
            <Button endIcon={<SendIcon />}
                onClick={postComment}
            >Post</Button>
        </div>
    )
}

export default AddComment