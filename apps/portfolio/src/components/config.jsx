import Head from 'next/head'

const titleDefault = 'Matthias M. Oberholzer'
const url = 'https://matthiasoberholzer.com'
const descriptionDefault =
  'Matthias is a web developer, student, and Awwwards Young Jury Member who currently explores WebGL and Three.js to step into the world of creative and interactive coding.'
const author = 'Matthias M. Oberholzer'
const ogImageDefault = '/banner.png'

export default function Header({
  title = titleDefault,
  description = descriptionDefault,
  ogImage = ogImageDefault,
}) {
  return (
    <>
      <Head>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='Software Engineer, Web Developer, Web Student, Awwwards Young Jury, Creative Developer, Photographer, Freelancer, Salzburg, Austria, Web Designer'
        />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta name='og:title' content={title} />
        <meta name='og:type' content='site' />
        <meta name='og:url' content={url} />
        <meta name='og:image' content={ogImage} />
        <meta name='og:site_name' content={title} />
        <meta name='og:description' content={description} />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/icons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/icons/safari-pinned-tab.svg'
          color='#000000'
        />
        <meta name='msapplication-TileColor' content='#f5f5f5' />
        <meta name='theme-color' content='#f5f5f5' />

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, initial-scale=1.0'
        />
        <meta name='theme-color' content='#f5f5f5' />
        <link rel='shortcut icon' href='/icons/favicon.ico' />

        {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@motcodes' />
      </Head>
    </>
  )
}
