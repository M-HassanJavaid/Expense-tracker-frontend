import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { LuMenu } from "react-icons/lu";
import { ImCross } from "react-icons/im";


const DashboardLayout = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <main>
            <div className='fixed top-0 left-0 right-0 z-50 border-b border-gray-200 p-4 bg-white flex gap-4 items-center'>
                <button onClick={()=> setIsSidebarOpen((prev)=> !prev) } className='sm:hidden' >
                    {isSidebarOpen ? <ImCross size={25} /> : <LuMenu size={30} />}
                </button>
                <p className='text-xl font-bold'>Expense Tracker</p>
            </div>
            <div className='flex'>
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className='flex-1 sm:ml-60 pt-16' >
                    {children}
                </div>
            </div>
        </main>
    )
}

export default DashboardLayout