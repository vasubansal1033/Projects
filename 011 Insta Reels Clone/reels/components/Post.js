import React, { useContext, useEffect, useRef, useState } from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/AuthContext';
import { updateObjectOnFirestore } from '../backend/firebaseFirestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import CommentDialogue from './CommentDialogue';

function Post({ userData, postData }) {

    const { user, loading } = useContext(AuthContext);
    const [like, setLike] = useState(false);
    const [open, setOpen] = React.useState(null);

    const currPostRef = useRef();

    const handleClickOpen = (id) => {
        setOpen(id);
    };
    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        if (postData?.likes?.includes(user?.uid)) {
            setLike(true);
        } else {
            setLike(false);
        }
    }, [postData]);

    if (loading) {
        return <div>
            <CircularProgress style={{ marginLeft: '50vw', marginTop: '50vh' }} />
        </div>;
    }

    const handleLike = () => {
        let updateObj;
        if (like) {
            updateObj = {
                likes: arrayRemove(user?.uid)
            }
        } else {
            updateObj = {
                likes: arrayUnion(user?.uid)
            }
        }
        setLike(!like);
        updateObjectOnFirestore("posts", postData?.postId, updateObj)
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted
    }

    const handleScroll = (e) => {
        const currPost = currPostRef.current;
        const nextPost = currPost.nextElementSibling;
        if (nextPost) {
            nextPost.scrollIntoView();
            e.target.muted = true;
        }
    }

    return (
        <div ref={currPostRef}>
            <div className="post-container">
                <video
                    src={postData?.postURL}
                    onEnded={handleScroll}
                    onClick={handleClick}
                    muted="muted"
                    autoPlay
                />

                <div className="video-info">
                    <div className="user-info">
                        <div className="avatar">
                            <Avatar alt="Vasu Bansal" src={postData?.profileURL} />
                        </div>
                        <div className="user-name">
                            <p style={{ color: 'white' }}>{postData?.profileName}</p>
                        </div>
                    </div>

                    <div className="post-btns">
                        <div className="like-btn"
                            onClick={handleLike}>
                            <FavoriteBorderRoundedIcon
                                style={like ? { fill: 'red' } : { fill: 'white' }}

                            />
                            <p style={{ color: 'white' }}>{postData?.likes?.length}</p>
                        </div>
                        <div
                            className="chat-btn"
                            onClick={() => handleClickOpen(postData.postId)}
                        >
                            <ChatBubbleOutlineRoundedIcon style={{ fill: 'white' }} />
                            <p style={{ color: 'white' }}>{postData?.comments?.length}</p>
                        </div>
                        <CommentDialogue open={open} handleClickOpen={handleClickOpen}
                            handleClose={handleClose} postData={postData} like={like}
                            setLike={setLike} handleLike={handleLike} />
                    </div>
                </div>
            </div>
            <hr style={{ margin: 0 }} />
        </div>
    )
}

export default Post