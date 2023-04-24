import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { CarouselProvider, Slider, Slide, Image as ImageCarousel } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    try {
      setLoading(true); setError('');
      await login(email, password);
      // console.log("Login successfull");
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError('');
      }, 2000)
    }
    setLoading(false);
  }

  const router = useRouter();
  useEffect(() => {
    if (user) {
      // console.log("user logged in");
      router.push('/');
    } else {
      // console.log("User not logged in!");
    }
  }, [user, router]);

  return (
    <div className="login-container">
      <div className="carousel-bg" priority={1}>
        <div className="carousel">
          <CarouselProvider
            naturalSlideWidth={241}
            naturalSlideHeight={423}
            totalSlides={5}
            isPlaying={true}
            isinfinite={"true"}
            interval={2000}
          >
            <Slider>
              <Slide index={0}><ImageCarousel src='assets/pic1.jpg' /></Slide>
              <Slide index={1}><ImageCarousel src='assets/pic2.jpg' /></Slide>
              <Slide index={2}><ImageCarousel src='assets/pic3.jpg' /></Slide>
              <Slide index={3}><ImageCarousel src='assets/pic4.jpg' /></Slide>
              <Slide index={4}><ImageCarousel src='assets/pic5.jpg' /></Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>

      <div className="login-card">
        <Image src='/assets/instagram.jpg' width={250} height={75} alt='logo' priority={1} />
        <TextField
          fullWidth margin='dense' label="Email"
          variant="outlined" type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth margin='dense' label="Password"
          variant="outlined" type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {
          error != '' &&
          (
            <div className="login-error" style={{ marginTop: '0.5rem' }}>
              <span style={{ color: 'red' }}>{error}</span>
            </div>
          )
        }

        <Button variant="contained"
          style={{ marginTop: '1rem' }}
          onClick={handleLoginSubmit}
          disabled={loading}
        >
          Click here to login
        </Button>

        <div className="login-error" style={{ marginTop: '1rem' }}>
          <Link href='/forgotPassword'><span style={{ color: 'blue' }}>Forgot password?</span></Link>
        </div>

        <div className="footer-card">
          <p>Don&apos;t have an account? <Link href='/signup'><span style={{ color: 'blue' }}>Signup</span></Link></p>
        </div>
      </div>


    </div>
  )
}

export default Login