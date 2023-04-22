import { useContext } from 'react';
import Feed from '../components/Feed';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';

export default function Home() {

  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>
      <CircularProgress style={{ marginLeft: '50vw', marginTop: '50vh' }} />
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
        user?.uid ? <Feed /> : <Redirect />
      }
    </div>
  )
}
