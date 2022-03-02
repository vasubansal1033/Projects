import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import ProfileComp from '../../components/profileComp'
import { AuthContext } from '../../context/auth';
import { auth } from '../../firebase';

export default function Profile() {

  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push('/login');
    return null;
  }

  return (
    <div>      
      {
        user?.uid ? <ProfileComp /> : <Redirect />
      }
    </div>
  )
}
