import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/TransactionOverview'
import TransactionInput from '../../components/TransactionInput'
import { useGetTransactionsQuery } from '../../services/TransactionApi'
import ExpenseGraph from '../../components/transactionGraph'
import TransactionHistory from '../../components/TransactionHistory'

const Income = () => {

    const [isInputOpen, setIsInputOpen] = useState(false);
    const { data } = useGetTransactionsQuery({ action: 'expense', limit: 10 })
    const { data: history } = useGetTransactionsQuery({ action: 'expense' })


    return (
        <DashboardLayout>
            {isInputOpen && <TransactionInput setIsInputOpen={setIsInputOpen} />}
            <div className='p-2'>
                <IncomeOverview onInputOpen={() => setIsInputOpen((prev) => !prev)} action="expense" />
                {data && <ExpenseGraph data={data.transactions} />}
            </div>
            <h1 className='py-3 px-4 font-bold text-xl'>Your Income history</h1>
            { history && <TransactionHistory data={history.transactions} />}

        </DashboardLayout>
    )
}

export default Income