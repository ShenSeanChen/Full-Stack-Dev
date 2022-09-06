import React from 'react'
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
    DotsHorizontalIcon,
    ChatIcon,
    BookmarkAltIcon,
    EmojiHappyIcon
  } from '@heroicons/react/outline';

import {HomeIcon, HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
// ellipsis-horizontal


// function Post(props) {
function Post({ id, username, userImg, img, caption}) {
  return (
    <div className="bg-white my-7 border  rounded-sm">

        {/* Header */}
        <div className="flex items-center p-2">
            <img src={userImg} alt="" 
                className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
            />
            <p className="flex-1 font-bold">{username}</p>
            <DotsHorizontalIcon className="h-5 mr-2" />
        </div>

        {/* Image */}
        <img src={img} 
            className="object-cover w-full h-full"
        alt=""/>
            
        {/* Buttons */}
        <div className="flex justify-between items-center my-2 px-2">
            <div className="flex space-x-4  ">
                <HeartIcon className="btn" />
                <ChatIcon className="btn" />
                <PaperAirplaneIcon className="btn"/>
            </div>
            <BookmarkAltIcon className='btn mr-2'/>
        </div>
        

        {/* Caption */}
        <div>
            <p className='px-3 mb-3 truncate'>
                <span className="font-bold">@{username} </span>
                {caption}
            </p>
        </div>

        {/* Comments */}

        {/* Input Box  */}
        <div className='px-2'>
            <form className='flex items-center mb-2 mr-4'>
                <EmojiHappyIcon className='btn'/>
                <input type="text" placeholder="Add a Comment..." 
                    className='border-none flex-1 focus:ring-0 outline-none' />
                <button className='font-semibold text-blue-500'>Post</button>
            </form>
        </div>

        
      
    </div>
  )
}

export default Post
