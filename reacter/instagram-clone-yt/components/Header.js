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
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// import packages for global state management
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";


/////
// Main header function 
function Header() {
  const {data: session} = useSession();
//   console.log(session)

  // statement management with recoil
  const [open, setOpen] = useRecoilState(modalState);
//   console.log('what is modal state') 
//   console.log(modalState)

  const router = useRouter();
  console.log(session)

//   const getProfile = async (session) => {
// 	if (session.user != null) {
// 		return session.user.image
// 	}
//   }

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">

	  {/* Top Head Bar Section */}
      <div className='flex justify-between bg-white mx-5 lg:mx-auto max-w-6xl '>

        {/* Left --- Logo of Instagram */}
		
			{/* Instagram Text: hidden unless it is large screen */}
			<div className='relative hidden lg:inline-grid ml-2 p-2 w-24 cursor-pointer'
				onClick={() => router.push('/')}
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
			<div className='relative w-10 m2-1 p-2 lg:hidden flex-shrink-0 cursor-pointer'
				onClick={() => router.push('/')}>
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
		<div className="flex mr-2 items-center justify-end space-x-4">

			<MenuIcon className="h-6 md:hidden cursor-pointer" />

			<HomeIcon className="navBtn" onClick={() => router.push('/')}/>

			{session ? (
				// wrap the following in a fragment: <></>
				<> 
					{/* console.log(session) */}
					<div className="relative navBtn">
					<PaperAirplaneIcon className="navBtn rotate-45"/>
					<div 
						className="absolute -top-1 -right-2 text-xs 
						w-5 h-5 bg-red-500 rounded-full 
						flex items-center justify-center 
						animate-pulse text-white">3</div>
					</div>
					
					<PlusCircleIcon onClick={() => setOpen(true)} className="navBtn"/>

					<UserGroupIcon className="navBtn"/>
					<div className="relative navBtn">
						<HeartIcon className="navBtn"/>
						<div className="absolute -top-1 -right-1 text-xs w-5 h-5 
									bg-pink-300 rounded-full flex items-center justify-center
									animate-pulse text-gray-500">5</div>
					</div>

					<img 
						onClick={signOut}
						src={session?.user?.image}
						// src={getProfile}
						// src="https://lh3.googleusercontent.com/a-/AFdZucp9ioenVp32syMGC2Vx9_Fr5kKiYvrChwHn-2QQxA=s96-c"
						// src="https://links.papareact.com/3ke" 
						// src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia-exp1.licdn.com%2Fdms%2Fimage%2FC4E03AQHdafUD-c86xA%2Fprofile-displayphoto-shrink_200_200%2F0%2F1625974740375%3Fe%3D1657756800%26v%3Dbeta%26t%3DdRr0Hw_4Njr6rhJn6GxtuYgtEQlZHvI6P5WX9P1GwjA&imgrefurl=https%3A%2F%2Fwww.linkedin.com%2Fpub%2Fdir%2FShen%2B%2FChen%3Ftrk%3Dpublic_profile_samename-see-all&tbnid=UkdMzVzak7zQ7M&vet=12ahUKEwitpbiL2_v5AhVvg3IEHbqWB3kQMygOegQIARBS..i&docid=Y8HUEnF5rFRr_M&w=200&h=200&itg=1&q=sean%20chen%20shen&ved=2ahUKEwitpbiL2_v5AhVvg3IEHbqWB3kQMygOegQIARBS"				
						alt="profile pic" 
						className="h-8 w-8 rounded-full cursor-pointer"
					/>
				</>
				
			) : (
				<button onClick={signIn}>Sign In</button>
			)}
			
			
	
		</div>
    </div>
    </div > 
  )
}

export default Header;
