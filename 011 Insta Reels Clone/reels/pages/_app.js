import '@/styles/globals.css'
import '@/styles/signup.css'
import '@/styles/login.css'
import '@/styles/navbar.css'
import '@/styles/feed.css'
import '@/styles/videos.css'
import '@/styles/profile.css'
import AuthWrapper from '../backend/AuthWrapper'

export default function App({ Component, pageProps }) {

  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}
