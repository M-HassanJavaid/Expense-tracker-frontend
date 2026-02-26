import React from 'react'
import cn from '../../utils/cn'

const Loader = ({ className }) => {
  return (
    <div className={cn("w-full h-screen fixed inset-0 flex justify-center items-center" , className)} >
        <div className='h-20 w-20 rounded-full border-4 border-t-white border-b-violet-700 border-x-violet-700 animate-spin'>

        </div>
    </div>
  )
}

export default Loader