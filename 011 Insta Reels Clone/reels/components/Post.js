import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import React, { useContext, useEffect, useState } from 'react'
import {findDOMNode } from 'react-dom';
import { AuthContext } from '../context/auth'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import CommentDialogue from './CommentDialogue';


function Post({ postData, userData }) {

    const { user } = useContext(AuthContext);
    const [like, setLike] = useState(false);
    useEffect(() => {
        if (postData.likes.includes(user.uid)) {
            setLike(true);
        } else {
            setLike(false);
        }
    }, [postData])

    const handleLike = async () => {
        if (!like) {
            await updateDoc(doc(db, 'posts', postData.postId), {
                likes: arrayUnion(user.uid)
            })
        } else {
            await updateDoc(doc(db, 'posts', postData.postId), {
                likes: arrayRemove(user.uid)
            })
        }
    }

    const [open, setOpen] = React.useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };
    const handleClose = () => {
        setOpen(null);
    };
    const handleScroll = (e) => {
        let nextVideo = findDOMNode(e.target).parentNode.nextSibling;
        if (nextVideo) {
            nextVideo.scrollIntoView({ behavior: "smooth" });
            e.target.muted = true;
        }
    }


    return (
        <div className='post-container' >

            <video src={postData.postURL} muted={true}
                onClick={(e) => {
                    e.target.muted = !e.target.muted
                }}
                onEnded={handleScroll}
            />
            <div className="videos-info" >
                <div className='avatar-container'>
                    <Avatar alt="Remy Sharp" src={postData.profileURL} sx={{ width: 56, height: 56, margin: "0.75rem" }} />
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{postData.profileName}</p>
                </div>
                <div className='post-info'>
                    <div className='post-like'>
                        <FavoriteIcon fontSize='medium'
                            style={like ? { color: "red" } : { color: "black" }}
                            onClick={handleLike} />
                        <p style={{ opacity: postData.likes.length == 0 ? 0 : 1, fontSize: '1rem' }}>
                            {postData.likes.length}
                        </p>
                    </div>

                    <CommentIcon style={{ color: 'grey' }} fontSize='medium'
                        onClick={() => handleClickOpen(postData.postId)}
                    />
                    <CommentDialogue open={open} handleClickOpen={handleClickOpen}
                        handleClose={handleClose} postData={postData} like={like}
                        setLike={setLike} handleLike={handleLike} />

                </div>
            </div>
        </div>
    )
}

export default Post