import React from 'react'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Avatar from '@mui/material/Avatar';

function Videos() {
    return (
        <div className="videos-container">
            <div className="post-container">
                <video src=""></video>

                <div className="video-info">
                    <div className="user-info">
                        <div className="avatar">
                            <Avatar alt="Vasu Bansal" src="/assets/default_dp.png" />
                        </div>
                        <div className="user-name">
                            <p style={{color: 'white'}}>Vasu Bansal</p>
                        </div>
                    </div>

                    <div className="post-btns">
                        <div className="like-btn">
                            <FavoriteBorderRoundedIcon style={{ fill: 'white' }} />
                            <p style={{color: 'white'}}>10</p>
                        </div>
                        <div className="chat-btn">
                            <ChatBubbleOutlineRoundedIcon style={{ fill: 'white' }} />
                            <p style={{color: 'white'}}>10</p>
                        </div>
                    </div>
                </div>

                <video src=""></video>
                <video src=""></video>
            </div>
        </div>
    )
}

export default Videos