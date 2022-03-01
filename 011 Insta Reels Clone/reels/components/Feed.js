import React from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Feed() {
  return (
    <div className="feed-container">
      <Navbar />
      <Upload />
      <div className='videos-container'>

        <div className='post-container'>
          <video></video>

          <div className="videos-info">
            <div className='avatar-container'>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56, margin: "0.75rem" }} />
              <p>Name</p>
            </div>
            <div className='post-like'>
              <FavoriteIcon fontSize='large' />
              <p>10</p>
            </div>
          </div>

        </div>
        <div className='post-container'>
          <video></video>
          <div className="videos-info">
            <div className='avatar-container'>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 56, height: 56, margin: "0.75rem" }} />
              <p>Name</p>
            </div>
            <div className='post-like'>
              <FavoriteIcon fontSize='large' />
              <p>10</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Feed