import React from 'react'
import TransactionItem from './TransactionItem'
import { LuTrash2 } from "react-icons/lu";
import { useDeleteTransactionMutation } from '../services/TransactionApi';


const TransactionHistory = ({data}) => {

  return (
    <div className='flex flex-col p-3 gap-3'>
        {data.map((d)=> <TransactionItem {...d}/> ) }
    </div>
  )
}

export default TransactionHistory