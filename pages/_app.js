import '@/styles/globals.scss'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { DataProvider } from '@/components/DataContext'

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </SSRProvider>
  )
}
