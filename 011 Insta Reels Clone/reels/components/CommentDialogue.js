import React, { useContext, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import AddComment from './AddComment';
import Comments from './Comments';
import { List } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

export default function CommentDialogue({ open, handleClickOpen, handleClose, postData, like, setLike, handleLike }) {

    const { user } = useContext(AuthContext);
    return (
        <div>
            <Dialog
                open={open == postData.postId}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth='lg'
            >
                <div className='modal-container'>
                    <div className='modal-video-container'>
                        <video autoPlay={true} muted="muted" controls>
                            <source src={postData.postURL} />
                        </video>
                    </div>
                    <div className='comment-container'>

                        <Card variant='outlined' sx={{ maxWidth: '80%' }}>
                            <CardHeader
                                avatar={
                                    <Avatar alt="Remy Sharp" src={postData.profileURL} sx={{ width: 56, height: 56, margin: "0.75rem", border: '0.1rem solid black' }} />
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={postData?.profileName}
                                subheader={`${postData?.timestamp.toDate().toLocaleDateString()} ${postData.timestamp.toDate().toLocaleTimeString()}`}
                            />
                            {/* <CardMedia
                                
                            /> */}
                            <CardContent>
                                {/* can be used to create status */}
                                <Typography>This post has {postData.likes.length} likes. This is the post status</Typography>
                            </CardContent>

                            <CardActions>
                                <div className='modal-post-info'>
                                    <div className='modal-post-info-icons'>
                                        <FavoriteIcon fontSize='medium' style={like ? { color: "red" } : { color: "black" }}
                                            onClick={handleLike} />
                                        <CommentIcon style={{ marginLeft: '1rem', marginRight: '1rem', color: 'grey' }} fontSize='medium' />
                                        <Button size="small">Share</Button>
                                    </div>
                                    <p style={{ fontSize: '1rem', marginLeft: '1rem' }}>
                                        {postData.likes.length == 0 ? 'No one likes this yet' :
                                            postData.likes.length == 1 ? `1 person likes this` :
                                                `${postData.likes.length} people like this`}
                                    </p>
                                    <Card variant='outlined' className='comment-card' style={{marginBottom: '1rem'}}>
                                        <List className='comment-card-list' style={{ maxHeight: '30vh'}}>
                                            <Comments postData={postData} />
                                        </List>
                                    </Card>

                                    <AddComment postData={postData} />
                                </div>


                                {/* <Button size="small">Learn More</Button> */}
                            </CardActions>
                        </Card>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}
