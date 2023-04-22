import React from 'react'
import Navbar from './Navbar'

function ProfileComponent() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="profile-user-info">
          <div className="profile-image">
            <img
              src="/assets/my_pic.jpg"
              alt="profilePic"
              height={'100px'}
              width={'100px'}
              style={{ borderRadius: '50%' }}
            />
          </div>
          <div className="user-text-info">
            <h3>basu.vansal</h3>
            <h3>Posts: 3</h3>
          </div>
        </div>
        <hr />
        <div className="profile-videos">
          <video src="assets/test_video.mp4"></video>
          <video src="assets/test_video.mp4"></video>
          <video src="assets/test_video.mp4"></video>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent