import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardCard from '../../components/DashboardCard'
import { useGetOverviewQuery } from '../../services/dashboardApi'
import DashboardCardSkeleton from '../../components/DashboardCardSkeleton'
import { LuWallet } from "react-icons/lu";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import FinancialOverview from '../../components/FinancialOverviewChart'
import Loader from '../../components/Inputs/Loader'
import TransactionItem from '../../components/TransactionItem'
import { useGetTransactionsQuery } from '../../services/TransactionApi'



const Home = () => {

  const { isFetching : overviewFetching, data : overviewData } = useGetOverviewQuery();
  const {data , isFetching} = useGetTransactionsQuery({limit: 5})
  if (isFetching) {
    return <Loader/>
  }


  return (
    <DashboardLayout>
      <div className='w-full '>
        {!overviewData && overviewFetching && [0, 0, 0].map(() => <DashboardCardSkeleton />)}
        {overviewData && (
          <div className='flex flex-wrap justify-between p-5 gap-3' >
            <DashboardCard
              title='Total income'
              amount={overviewData.overview.income}
              icon={FaMoneyBillTrendUp}
              bgColor='green'
            />
            <DashboardCard
              title='Total expense'
              amount={overviewData.overview.expense}
              icon={LuWallet}
              bgColor='red'
            />
            <DashboardCard
              title='Total Balance'
              amount={overviewData.overview.totalBalance}
              icon={LuWallet}
              bgColor='blue'
            />
          </div>
        )}

        <div className='flex flex-col gap-3 p-3 lg:flex-row'>
          <div className='flex-1 bg-white p-3 rounded-3xl shadow-sm border border-gray-50'>
              <p className='p-3'>Recent Transaction</p>
            
            {console.log(data)}
            {data && data.transactions.map((t)=> <TransactionItem  {...t} />)}
          </div>
          <div className=''>
            {overviewData && <FinancialOverview data={overviewData.overview} />}
          </div>
        </div>
      </div>


    </DashboardLayout>
  )
}

export default Home