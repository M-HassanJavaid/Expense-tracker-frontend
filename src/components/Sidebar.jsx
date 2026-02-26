import React from 'react';
import { LuLayoutDashboard, LuWallet, LuLogOut } from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../services/authApi';
import { setLogin, setLogout } from '../features/authSlice';
import dashboardApi from '../services/dashboardApi';

const Sidebar = ({isSidebarOpen}) => {

    const loaction = useLocation();
    const user = useSelector((state) => state.user);
    const [fetchLogout, { data }] = useLogoutMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const menuItems = [
        { name: 'Dashboard', icon: <LuLayoutDashboard />, pathname: '/' },
        { name: 'Income', icon: <LuWallet />, pathname: '/income' },
        { name: 'Expense', icon: <FaHandHoldingUsd />, pathname: '/expense' },
    ];

    async function getLogout() {
        try {
            let isConfirm = confirm('Are you really want to logout?');
            if (!isConfirm) return
            let res = await fetchLogout().unwrap();
            if (!res.success) {
                throw new Error(res.message)
            }

            dispatch(setLogout());
            dispatch(dashboardApi.util.invalidateTags(['Overview']))
            
            navigate('/login')

        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    return (
        <div className={`fixed ${isSidebarOpen ? 'left-0' : '-left-60'} sm:left-0 top-16 bottom-0 w-60 z-40 flex flex-col bg-gradient-to-b from-gray-50 to-white p-5 shadow-sm border-r border-gray-200 overflow-y-auto transition-all`}>
            <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-100">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-3 shadow-sm">
                    {user.image && <img
                        src={user.image.url}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />}
                </div>
                <h2 className="text-sm font-semibold text-gray-900">{user.name}</h2>
            </div>

            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => (
                    <Link to={item.pathname} className='block'>
                        <button
                            key={item.name}
                            className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
                            ${(loaction.pathname === item.pathname)
                                    ? 'bg-[#7c4dff] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                        </button>
                    </Link>
                ))}
                <button
                    onClick={getLogout}
                    className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium`}
                >
                    <span className="text-lg"><LuLogOut/></span>
                    <span>Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;