import React from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Videos from './Videos'


function Feed() {
  return (
    <div className='feed-container'>
      <Navbar />
      <Upload />
      <Videos />
    </div>
  )
}

export default Feed