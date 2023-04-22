import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { uploadFileToCloudStorage } from '../../backend/firebaseCloudStorage';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { signUp, user = null } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/');
    } else {
      console.log("User not logged in!");
    }
  }, [user]);

  const handleSignupSubmit = async (e) => {
    try {
      setLoading(true); setError('');
      const newUser = await signUp(email, password);
      console.log(newUser.user.uid);
      await uploadFileToCloudStorage(`${newUser.user.uid}/profile_picture`, username, email, newUser.user.uid, file)

      console.log("Signup successfull");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 2000)
    }
    setLoading(false);
  }

  return (
    <div className="signup-container">

      <div className="signup-card">
        <Image src='/assets/instagram.jpg' width={250} height={75} alt='logo' priority={1} />
        <TextField
          fullWidth margin='dense'
          label="Email" variant="outlined"
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth margin='dense'
          label="Password"
          variant="outlined"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth margin='dense'
          label="Full name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          variant="outlined"
          component="label"
          style={{ marginTop: '1rem' }}

        >
          Upload
          <input hidden accept="image/*"
            multiple type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        <br />

        {
          error != '' &&
          (
            <div className="signup-error" style={{ marginTop: '0.5rem' }}>
              <span style={{ color: 'red' }}>{error}</span>
            </div>
          )
        }

        <Button
          variant="contained"
          style={{ marginTop: '1rem' }}
          onClick={handleSignupSubmit}
          disabled={loading}
        >
          Click here to Signup
        </Button>
      </div>

      <div className="footer-card">
        <p>Already have an account? <Link href='/login'><span style={{ color: 'blue' }}>Login</span></Link></p>
      </div>
    </div>
  )
}

export default Signup