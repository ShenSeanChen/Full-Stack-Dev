import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

// -- 1. npx create-next-app -e with-tailwindcss spotify-clone-yt
// -- 2. index.js --> npm run dev
// -- 3. heroicons: npm install @heroicons/react


const Home: NextPage = () => {
  return (
    <div className="">
      <h1>This is a DOPE spotify 2.0 build</h1>

      <main>
        <Sidebar />
        {/* Center */}
      </main>
      

      <div>
        {/* Player */}
      </div>


    </div>
  )
}

export default Home
