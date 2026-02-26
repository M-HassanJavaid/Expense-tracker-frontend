import React from 'react'
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";



const TransactionOverview = ({ onInputOpen , action, className }) => {
    return (
        <div className='bg-white shadow-sm rounded-lg border border-gray-100'>
            <div className='flex flex-col md:flex-row justify-between py-3 md:py-4 px-4 md:px-5 items-start md:items-center gap-3'>
                <div>
                    <h1 className='text-lg md:text-xl font-semibold text-gray-900'>{(action === 'income') ? 'Income Overview' : 'Expense Overview'}</h1>
                    <p className='text-gray-500 text-xs md:text-sm mt-0.5'>{action === 'income' ? 'Track your income over time': 'Track your expenses over time'}</p>

                </div>
                <button onClick={onInputOpen} className='flex gap-2 items-center py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-medium text-xs md:text-sm transition-colors duration-150 whitespace-nowrap'>
                    <span>{(action === 'income') ? 'Add Income' : 'Add Expense'}</span><FaPlus size={14}/>
                </button>
            </div>
        </div>
    )
}

export default TransactionOverview