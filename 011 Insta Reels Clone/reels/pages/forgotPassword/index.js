import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { forgotPassword, user } = useContext(AuthContext);

    const router = useRouter();
    const handleClick = async () => {
        try {
            setLoading(true); setError('');

            await forgotPassword(email);
            console.log("Email sent");
            router.push('/login');
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
                <Image src='/assets/instagram.jpg' width={250} height={75} alt='logo' />
                <TextField
                    id="outlined-basic"
                    fullWidth margin='dense'
                    label="Email" variant="outlined"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button variant="contained"
                    style={{ marginTop: '1rem' }}
                    onClick={handleClick}
                    disabled={loading}
                >
                    Forgot password
                </Button>

                {
                    error != '' &&
                    (
                        <div className="login-error" style={{ marginTop: '0.5rem' }}>
                            <span style={{ color: 'red' }}>{error}</span>
                        </div>
                    )
                }

                <div className="footer-card" style={{ marginTop: '6rem' }}>
                    <p>Don&apos;t have an account? <Link href='/signup'><span style={{ color: 'blue' }}>Signup</span></Link></p>
                </div>
            </div>


        </div>
    )
}

export default ForgotPassword

