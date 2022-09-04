import Image from 'next/image';
import React from 'react';

//////
// import icons from heroicons 
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon
  } from '@heroicons/react/outline';
import {HomeIcon} from '@heroicons/react/solid';


/////
// Main header function 
function Header() {
  return (
    <div>

	  {/* Top Head Bar Section */}
      <div className='flex justify-between bg-white mx-5 lg:mx-auto max-w-6xl '>

        {/* Left --- Logo of Instagram */}
		
			{/* Instagram Text: hidden unless it is large screen */}
			<div className='relative hidden lg:inline-grid ml-1 p-2 w-24 cursor-pointer'
			// whenever we write in tailwind, everything is mobile first
			>
			<Image
				src="https://links.papareact.com/ocw" 
				layout='fill' // it takes the max of the screen
				// Need to add to next.config.js the following
				// images: {
				//     domains: ['links.papareact.com']
				//   }
				objectFit="contain" //keep the ratios of the image
			/>
			</div>  

			{/* Instagram Logo: hidden in large screen */}
			<div className='relative w-10 ml-1 p-2 lg:hidden flex-shrink-0 cursor-pointer'>
			<Image
				src="https://links.papareact.com/jjm" 
				layout='fill'
				objectFit="contain"
			/>
			</div>


      	{/* Middle --- Search Input; checkout heroicons */}
		
			<div className="max-w-xs">
				<div className='relative p-2 rounded-md'
					// Need to add the following to tailwind.config.js
					// plugins: [
					// 	require("@tailwindcss/forms")
					//   ],
				>

					<div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
						<SearchIcon className="h-5 w-5 text-gray-500" />
					</div>

					<input 
						className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md
								focus:ring-black focus:border-black' 
						type="text" placeholder="Search" 
					/>
					
				</div>
			</div>


	  	{/* Right --- Buttons!!! */}
		<div className="flex mr-1 items-center justify-end space-x-4">

			<MenuIcon className="h-6 md:hidden cursor-pointer" />

			<HomeIcon className="navBtn" />
			<PaperAirplaneIcon className="navBtn"/>
			
		</div>
		
    </div>

    </div > 
  )
}

export default Header;
