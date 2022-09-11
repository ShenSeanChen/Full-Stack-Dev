import { signOut, useSession } from 'next-auth/react'
import React from 'react'

function MiniProfile() {
  const {data: session } = useSession();
  // console.log(session);

  return (
    <div className="flex items-center justify-between mt-14 ml-10">

         <img 
            // src="https://links.papareact.com/3ke" 
            src={session?.user?.image}
            className="w-16 h-16 rounded-full border p-[2px]"
            alt=""/>

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'> @{session?.user?.username} </h2>
            <h3 className="text-sm text-gray-600"> Welcome to {session?.user?.name}'s Stories! </h3>
        </div>

        <button onClick={signOut} className='text-blue-400 text-sm font-semibold'>Sign Out</button>
      
    </div>
  )
}

export default MiniProfile
