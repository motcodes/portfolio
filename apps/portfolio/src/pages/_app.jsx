import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Header from '@/components/config'
import Dom from '@/components/layout/dom'
import { useStore } from '@/hooks'
import { partition } from '@/helpers'
import '@/styles/index.css'
// import 'react-nice-scroll/dist/styles.css'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child }) => {
  // @ts-ignore
  const [r3f, dom] = partition(child, (c) => {
    return c.props && c.props.r3f === true
  })

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header
        title={pageProps.title}
        description={pageProps.description}
        ogImage={pageProps.ogImage}
      />
      <Balance child={child} />
    </>
  )
}

export default App
