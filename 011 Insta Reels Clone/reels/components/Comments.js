import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { CardContent } from '@mui/material';
import { doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
function Comments({ postData }) {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        let tempArray = [];
        postData.comments.map(async (commentId, idx) => {
            const unsub = onSnapshot(doc(db, 'commentCollection', commentId), (doc) => {
                
                if(doc.data()!=undefined) {
                    tempArray.push(doc.data());
                    setComments([...tempArray]);
                }
            })
            return () => {
                unsub();
            }
        })

    }, [postData])

    // console.log(comments);

    return (
        <div className='comments-container'>
            {
                comments === null ? <CircularProgress /> :
                    comments.map((comment, idx) => {                        
                        return <CardContent key={idx}>
                            <div className='eachCommentContainer'>
                                <Avatar alt="Remy Sharp" src={comment.userPic}
                                    sx={{ width: 35, height: 35, margin: "0.1rem", marginRight: '0.5rem' }}
                                />
                                <div className='comment-text'>
                                    <span>{comment.userName}</span>
                                    <p>{comment.commentText}</p>
                                </div>
                            </div>
                        </CardContent>
                    })
            }
        </div>
    )
}

export default Comments