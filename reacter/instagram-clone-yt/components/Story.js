import React from 'react'





// function Story(props) {
function Story({img, username}) {
  return (
    <div>
      <img src={img} alt="" 
        className="h-14 w-14 rounded-full p-[1.5px]
         border-red-500 border-2 object-contain
         hover:scale-110 transition transform duration-200 ease-out
         cursor-pointer"/>

      <p className="text-xs w-14 truncate text-center">{username}</p>
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg> */}

    </div>
  )
}

export default Story
