import '@/styles/globals.css';
import '@/styles/Home.css';
import Head from 'next/head'


export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Cash Flow</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </Head>
    <Component {...pageProps} />

  </>
}
