import { Avatar } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import FavoriteIcon from '@mui/icons-material/Favorite';

function Feed() {
    return (
        <div className="feed-container">
            {/* Navbar */}
            <Navbar />
            {/* upload videos */}
            <Upload />
            {/* reels */}
            <div className="videos-container">
                <div className="post-container">
                    <video src="https://firebasestorage.googleapis.com/v0/b/reels-839c5.appspot.com/o/posts%2F4be66176-9c81-421d-a64a-1b27fa681cfd%2Fproduction%20ID_4832217.mp4?alt=media&token=ba84693f-78c4-4f7c-92e3-deb3c81bad79" />
                    <div className="videos-info">
                        <div className="avatar_container">
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ margin: "0.5rem" }} />
                            <p>Name</p>
                        </div>

                        <div className="post-like">
                            <FavoriteIcon fontSize="large" />
                            10
                        </div>
                    </div>
                </div>
                <div className="post-container">
                    <video />
                </div>
            </div>
        </div>
    )
}

export default Feed
