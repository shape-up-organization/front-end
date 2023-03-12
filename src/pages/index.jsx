import Head from 'next/head'

import { LandingPage } from '@components/LandingPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>ShapeUp</title>
        <meta name="ShapeUp Landing Page" content="ShapeUp landing page" />
      </Head>
      <main>
        <LandingPage />
      </main>
    </>
  )
}
