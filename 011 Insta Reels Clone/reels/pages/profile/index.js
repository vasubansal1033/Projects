import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import ProfileComponent from '../../components/ProfileComponent';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {

    const { user, loading } = useContext(AuthContext);

    if(loading) {
        return <div>
            <CircularProgress style={{marginLeft: '50vw', marginTop: '50vh'}}/>
        </div>;
    }

    const Redirect = () => {
        const router = useRouter();
        router.push('/login');
        return null;
    }

    return (
        <div>
            {
                user?.uid ? <ProfileComponent /> : <Redirect />
            }
        </div>
    )
}
