import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import Input from './Inputs/Input'
import { useAddTransactionMutation } from '../services/TransactionApi'
import Loader from './Inputs/Loader'
import { useLocation } from 'react-router-dom'
import dashboardApi from '../services/dashboardApi'
import { useDispatch } from 'react-redux'

const TransactionInput = ({ setIsInputOpen }) => {
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [amount, setAmount] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();

  let action = location.pathname.slice(1);

  const [addTransaction, { data, isLoading, error , isError}] = useAddTransactionMutation();


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      

      let res = await addTransaction({
        source,
        icon,
        description,
        date,
        value: amount,
        action: action
      }).unwrap();

      
      console.log(res)

      if (res.success) {
        alert(`Your ${action} has successfully saved!`)
      }

      setIsInputOpen(false)
      dispatch(dashboardApi.util.invalidateTags(['Overview']))

    } catch (error) {
      alert(error.data.message)
    }
  }

  if (isLoading) {
    return <Loader className='fixed inset-0 h-screen w-screen z-100' />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-4">
        <ImCross
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => setIsInputOpen(false)}
          size={18}
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add {action}</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            type="text"
            placeholder="Icon (emoji) e.g., 💸"
            label="Icon"
          />
          <Input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            type="text"
            placeholder={(action === 'income') ? "Source (e.g., Salary, Grocery)" : 'Source (e.g., Groceries, Clothes )'}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full border border-gray-200 rounded-md p-2 text-sm text-gray-700 resize-none h-20"
          />

          <div className="flex gap-2">
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Amount"
            />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-36 border border-gray-200 rounded-md p-2 text-sm text-gray-700"
            />
          </div>


          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsInputOpen(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-[#7c4dff] text-white hover:opacity-95"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionInput