import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TransactionOverview from '../../components/TransactionOverview'
import TransactionInput from '../../components/TransactionInput'
import { useGetTransactionsQuery } from '../../services/TransactionApi'
import IncomeGrpah from '../../components/IncomeGrpah'
import TransactionHistory from '../../components/TransactionHistory'

const Income = () => {

  const [isInputOpen, setIsInputOpen] = useState(false);
  const {data} = useGetTransactionsQuery({action: 'income' , limit: 10});
  const { data : allTransactions } = useGetTransactionsQuery({action: 'income'})



  return (
    <DashboardLayout>
      { isInputOpen && <TransactionInput  setIsInputOpen={setIsInputOpen} />}
      <div className='p-2'>
        <TransactionOverview onInputOpen={()=> setIsInputOpen((prev)=> !prev)} action='income' />
        {data && <IncomeGrpah data={data.transactions} />}
      </div>
      <h1 className='py-3 px-4 font-bold text-xl'>Your Income history</h1>
      { allTransactions &&  <TransactionHistory data={allTransactions.transactions}/> }

    </DashboardLayout>
  )
}

export default Income