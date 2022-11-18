import '../styles/globals.css'
import { SearchContextProvider } from '../context/SearchContext'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </SessionProvider>
  )
}

export default MyApp
