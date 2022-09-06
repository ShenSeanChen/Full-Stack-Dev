import React from 'react'

function Suggestion({img, username, company}) {
  return (
    <div className="flex justify-between items-center py-2">
        <img src={img} alt="" 
        className='h-12 w-12 rounded-full object-contain border p-[2px] mr-3'/>
        
        <div className='flex-1 mx-4'>
            <h2 className='font-semibold'> {username} </h2>
            <h3 className="text-sm text-gray-600"> {company} </h3>
        </div>
        
        <button className='text-blue-600'>Follow</button>
    </div>
  )
}

export default Suggestion
