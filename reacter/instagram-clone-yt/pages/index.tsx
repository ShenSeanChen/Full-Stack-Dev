import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Modal from "../components/Modal"



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
// 9. npm install next-auth
//    npm install next-auth@beta
//    [...nextauth].js: add API route: https://next-auth.js.org/getting-started/example#add-api-route
// 10. firebase
//    create firebase project --> npm i firebase --> create file firebase.js
//    --> firebase > Project settings > Add app at </> 
//    --> copy the code to firebase.js (with some modification)
//    --> add a local file: .env.local --> update it with your web client id and web client secret
//    --> ctrl+C and npm run dev again 
//    --> info  - Loaded env from /Users/shenseanchen/Desktop/Full-Stack-Dev/reacter/instagram-clone-yt/.env.local
// 11. go to console.cloud.google --> API & Services --> Credentials
//     --> OAuth 2.0 Client IDs --> edit --> add in a http://localhost:3000
//     --> copy-paste the redirect url that you got from the error page on localhost
// 12. Session Provider
//     --> wrap our _app.tsx with SessionProvider from "next-auth/react"
//     --> add const {data: session} = useSession(); onsole.log(session) to your Header.js
// 13. add callbacks to [...nextauth].js and define session with username, uid, etc 
// 14. Router: const router = useRouter; 
//      onClick={() => router.push('/')
// 15. Use Recoil to manage global states： npm install recoil
//     Create a folder called atoms and create a file called modalAtom.js
// 16. // import packages for global state management
      // import { useRecoilState } from "recoil";
      // import { modalState } from "../atoms/modalAtom";
      // const [open, setOpen] = useRecoilState(modalState);
// 17. Firebase: create a database (Build>FireStore Database) 
//     --> Build>Storage>Rules (change if false to if true)
//     --> Create uploadPost async function in modal.js

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
      <Modal />

      
    </div>
  )
}

export default Home
