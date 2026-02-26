import React from 'react'
import { useGetTransactionsQuery } from '../services/TransactionApi'


const RecentTRansaction = () => {

    const {data } = useGetTransactionsQuery({
        limit: 5
    });



  return (
    <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-50'>
        
    </div>
  )
}

export default RecentTRansaction