import React from 'react'
import Navbar from './Navbar'
function ProfileComp() {
    return (
        <div>
            <Navbar />
            <div>
                <div className='profile-upper'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/insta-reels-clone-fb81d.appspot.com/o/iyC8xRMIQRWZLdKXNn4tRGDZ6FT2%2Fprofile?alt=media&token=e6b56d1e-2684-4aa6-8899-a3f207b9ae1b'
                        style={{ height: '8rem', width: '8rem', borderRadius: '50%', boxShadow: '0.3rem 0.3rem 1rem 0.3rem grey', objectFit: 'cover' }}
                    />
                    <div>
                        <h1>Name</h1>
                        <p>10 posts</p>
                    </div>
                </div>
                    <hr style={{marginTop: '0.5rem'}}/>
                <div className='profile-videos'>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                    <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'/>
                </div>
            </div>
        </div>
    )
}

export default ProfileComp