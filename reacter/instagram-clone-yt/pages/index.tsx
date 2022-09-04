import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header"



// 1. npx create-next-app -e with-tailwindcss instagram-clone-yt
// 2. npm run dev     
// 3. everyone on tailwind is mobile first!!!  
// 4. npm install @heroicons/react
// 5. npm install @tailwindcss/forms


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Instagram 2.0 YT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      {/* Header */}
      {/* Feed */} 
      {/* Modal */}

      
    </div>
  )
}

export default Home
