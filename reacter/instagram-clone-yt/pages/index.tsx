import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header"
import Feed from "../components/Feed"



// 1. npx create-next-app -e with-tailwindcss instagram-clone-yt
// 2. npm run dev     
// 3. everyone on tailwind is mobile first!!!  
// 4. npm install @heroicons/react
// 5. npm install @tailwindcss/forms
// 6. Go to https://github.com/faker-js/faker github
//    npm install --save-dev @faker-js/faker
// 7. npm install --save-dev tailwind-scrollbar
//    Add to tailwind.config.js:   
      // plugins: [
      //     require("@tailwindcss/forms"),
      //     require("tailwind-scrollbar")
      //   ],
// 8. npm install tailwind-scrollbar-hide




const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen 
    overflow-y-scroll scrollbar-hide"
    // npm install tailwind-scrollbar-hide
    
    >
      <Head>
        <title>Instagram 2.0 YT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      {/* Header */}
      <Header />
      {/* Feed */} 
      <Feed />
      {/* Modal */}

      
    </div>
  )
}

export default Home
