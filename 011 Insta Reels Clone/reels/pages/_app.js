import '../styles/globals.css'
import './signup/styles.css'
import './login/styles.css'
import '../components/Feed.css'
import '../components/Profile.css'
// import 'pure-react-carousel/dist/react-carousel.es.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import AuthWrapper from '../context/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
