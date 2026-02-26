import React, { useEffect, useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfileImageInput = ({ image, setImage }) => {

    const inputRef = useRef();
    const [previewUrl, setPreviewUrl] = useState(null);
    

    function handleImageChange(e) {
        let file = e.target.files[0];
        console.log('hello')
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview)
        }
    }

    function handleRemoveImage() {
        setImage(null);
        setPreviewUrl(null)
    }

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                className='hidden'
                onChange={handleImageChange}
                id='input'
            />

            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className='text-4xl text-primary' ></LuUser>

                    <label
                        htmlFor='input'
                        className='cursor-pointer h-8 w-8 flex items-center justify-center text-white bg-primary rounded-full absolute -bottom-1 -right-1' >
                        <LuUpload />
                    </label>
                </div>

            ) : (
                <div className='relative' >
                    <img
                        src={previewUrl}
                        alt="Profile Picture"
                        className='h-20 w-20 object-cover rounded-full'
                    />

                    <button className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileImageInput