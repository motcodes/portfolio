import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '@/hooks'
import '@/styles/index.css'

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  // const child = Component(pageProps).props.children

  return <>{Component(pageProps).props.children}</>
}

export default App
