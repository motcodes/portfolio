import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Header from '@/components/config'
import Dom from '@/components/layout/dom'
import { useStore } from '@/hooks'
import { partition } from '@/helpers'
import { sanityClient } from '@/lib/sanity.server'
import { footerQuery } from '@/lib/queries'
import { Footer } from '@/components/footer'
import '@/styles/index.css'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child, footer }) => {
  const [r3f, dom] = partition(child, (c) => {
    return c.props && c.props.r3f === true
  })

  return (
    <>
      <Dom>
        {dom}
        <Footer {...footer} />
      </Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps, footer }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header
        title={pageProps?.title}
        description={pageProps?.description}
        ogImage={pageProps?.ogImage}
      />
      <Balance child={child} footer={footer} />
    </>
  )
}

App.getInitialProps = async (context) => {
  const appProps = {}

  try {
    const footer = await sanityClient.fetch(footerQuery)
    appProps.footer = footer
  } catch (error) {
    return { ...appProps, error }
  }

  return { ...appProps }
}

export default App
