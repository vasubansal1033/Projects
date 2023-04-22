import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import insta from '../../assets/instagram.jpg'
import Button from '@mui/material/Button';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/pic1.jpg';
import bg2 from '../../assets/pic2.jpg';
import bg3 from '../../assets/pic3.jpg';
import bg4 from '../../assets/pic4.jpg';
import bg5 from '../../assets/pic5.jpg';
import { AuthContext } from '../../context/auth'
import { useRouter } from 'next/router';
import Link from 'next/link';

function ForgotPassword() {

    // condition re-routing/ programatic redirect
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { forgot, user } = useContext(AuthContext);

    const handleClick = async function () {
        try {
            setError('');
            setLoading(true);
            await forgot(email);
            console.log('Email sent');
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="carousel-bg">
                <div className="carousel">
                    <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        width={241}
                        height={423}
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}
                    // swipeable={false}
                    // animationHandler={'fade'}
                    >
                        <Image src={bg1} />
                        <Image src={bg2} />
                        <Image src={bg3} />
                        <Image src={bg4} />
                        <Image src={bg5} />
                    </Carousel>
                </div>
            </div>
            <div className="login-right">
                <div className="login-card">
                    <Image src={insta} />
                    <TextField size="small" margin="dense" id="outlined-basic"
                        fullWidth label="Email" variant="outlined"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                    />

                    {
                        error != '' && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>
                    }

                    <Button fullWidth variant="contained" margin="dense" component="span"
                        style={{ marginTop: '1rem' }}
                        onClick={handleClick}
                        disabled={loading}
                    >
                        Send Email
                    </Button>
                    <div style={{ color: 'blue', marginTop: '0.5rem' }}>Error will come here</div>
                </div>
                <div className="bottom-card">
                    Don&apos;t have an account? <Link href='/signup'><a><span style={{ color: 'blue' }}>Sign Up</span></a></Link>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword