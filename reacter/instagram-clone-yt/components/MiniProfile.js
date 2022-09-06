import React from 'react'

function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">

         <img src="https://links.papareact.com/3ke" 
            className="w-16 h-16 rounded-full border p-[2px]"
            alt=""/>

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'> @ShenSeanChen </h2>
            <h3 className="text-sm text-gray-600"> Welcome to Sean's Stories! </h3>
        </div>

        <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
      
    </div>
  )
}

export default MiniProfile
