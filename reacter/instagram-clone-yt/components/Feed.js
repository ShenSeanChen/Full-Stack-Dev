import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import MiniProfile from './MiniProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'

function Feed() {
  const {data: session} = useSession();
  // console.log("logging from feed")
  // console.log(session)
  // console.log("Finishing from feed")

  return (
    <main 
        className={`grid grid-cols-1 
        
        md:grid-cols-2 md:max-w-2xl 
        xl:grid-cols-3 xl:max-w-3xl mx-auto 
        px-10
        ${!session && "!grid-cols-1 !max-w-2xl"}`}
    >
    
        {/* Section on the Left */}
        <section className="col-span-2">
            {/* Stories */}
            {session && (<Stories />)}
            
            {/* Posts */}
            <Posts />
        </section>
            
        {/* Section on the Right */}
        {session && (
          <section className='hidden xl:inline-grid md:col-span-1'>
            <div className='fixed top-20'>
              {/* Mini Profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
            </div>
          </section>
        )}
    </main>

  )
}

export default Feed
