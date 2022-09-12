import React, { Fragment, useRef, useState } from 'react'
import {useRecoilState} from "recoil";
import {modalState} from "../atoms/modalAtom";
import {Dialog, Transition} from "@headlessui/react";
import { CameraIcon } from '@heroicons/react/outline';
//npm i @headlessui/react
import {db, storage} from "../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import {ref, getDownloadURL, uploadString, loading, setLoading} from "@firebase/storage";


function Modal() {
    const { data: session } = useSession();

    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const captionRef = useRef(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    };

    const uploadPost = async () => {
        if(loading) return;
        // setLoading(true);

        // 1) Create a post and add to firestore 'posts' collection
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })
        console.log("New doc added with ID", docRef.id);

        // 2) get the post ID for the newly created post
        // This will be a firebase storage and we are organizing it in a nice way
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        // 3) upload the image to firebase storage with the post ID
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);

            // 4) get a download URL from fb storage and update the original post with image
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            })
        });

        setOpen(false);
        // setLoading(false);
        setSelectedFile(null);
        
    }


    return (
        <Transition.Root show={open} as={Fragment}>

            {/* {open && <p>The Modal is open!</p>} */}
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={setOpen}
            >
                <div className='flex items-end justify-center min-h-[800px]
                sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    
                    {/* Laying the gray background with transition.child */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500
                            bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='hidden sm:inline-block sm:align-middle sm:h-screen'
                        aria-hidden="true"
                    >
                        Testing!!!
                    </span>

                    {/* Display the upload page */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4
                        text-center overflow-hidden shadow-xl transform transition-all 
                        sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                            <div>

                                {/* Upload photo Icon */}
                                {selectedFile ? (
                                    <div className='flex items-center justify-center py-2'>
                                        <img src={selectedFile} alt="" 
                                            className='w-full object-contain cursor-pointer'
                                            onClick={() => filePickerRef.current.click()}
                                            />
                                    </div>
                                    
                                ) : (
                                    <div 
                                        onClick={() => filePickerRef.current.click()}
                                        className='mx-auto flex items-center justify-center 
                                        h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                                    >
                                        <CameraIcon
                                            className='h-6 w-6 text-red-400'
                                            aria-hidden="true"
                                        />
                                    </div>
                                )}
                                

                                {/* Text: Upload Photo */}
                                <div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900 pt-2"
                                    >
                                        Upload a photo
                                    </Dialog.Title>
                                </div>

                                {/* A not-boring file-picker */}
                                <div>
                                    <input
                                        ref={filePickerRef}
                                        type="file"
                                        hidden
                                        onChange={addImageToPost}
                                    />
                                </div>

                                {/* Input Box */}
                                <div className="mt-2">
                                    <input
                                        className='border-none focus:ring-0 w-full text-center'
                                        type="text"
                                        ref={captionRef}
                                        placeholder="Let us know how you've been...:)"
                                    />
                                </div>

                                {/* Upload Button */}
                                <div className='mt-5 sm:mt-6'>
                                    <button
                                        type="button"
                                        onClick={uploadPost}
                                        diabled={!selectedFile}
                                        className='inline-flex justify-center w-full rounded-md
                                        border border-transparent shadow-sm
                                        px-4 py-2 bg-blue-300 text-base font-medium text-white
                                        hover:bg-blue-400
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                        sm:text-lg disabled:bg-gray-300 disabled:cursor-not-allowed
                                        hover:disabled:bg-gray-300'
                                    >
                                        {/* Upload Post */}
                                        {loading ? "Uploading..." : "Upload Post"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>



                </div>
            </Dialog>

        </Transition.Root>
    )
}

export default Modal
