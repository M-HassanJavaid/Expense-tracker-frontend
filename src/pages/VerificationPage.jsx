import React, { useEffect, useState } from 'react'
import { useGetVerificationEmailMutation, useLogoutMutation } from '../services/authApi';
import Loader from '../components/Inputs/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setLogout } from '../features/authSlice';

const VerificationPage = () => {

    const [isSent, setIsSent] = useState(false);
    const [fetchGetEmail, { isLoading, isError, error, data }] = useGetVerificationEmailMutation();
    const [ fetchLogout , { loggingOut , isLogoutError } ] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    async function getEmail() {
        try {
            let res = await fetchGetEmail().unwrap();
            if (!res.success) {
                alert(res.message);
                return;
            }
            setIsSent(true)

        } catch (error) {
            alert(error?.message || error?.data?.message || 'Unknown error');
            console.log(error)
        }
    }


    async function getLogout() {
        try {
            let res = await fetchLogout().unwrap();
            if(!res.success){
                throw new Error(res.message)
            }
            dispatch(setLogout());
            navigate('/login')
        } catch (error) {
            alert(error?.message || error?.data?.message || 'Failed to logout.')
        }
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (isLoading || loggingOut) {
        return <Loader />
    }


    return (
        <div className='h-screen w-screen flex justify-center items-center flex-col gap-5 p-5'>
            <h1 className='text-2xl font-bold text-center' >
                {isSent ?
                    'A verification email has sent to your email. Check your inbox or spam box' :
                    'Your email is not verified. Click the button to get verification email.'}
            </h1>
            <button
                onClick={getEmail}
                className={`btn-primary max-w-50  ${isSent && 'pointer-events-none cursor-not-allowed opacity-50'}`} >Get verification email</button>
            <button
                onClick={getLogout}
                className={`btn-primary max-w-50 `} >Logout</button>
        </div>
    )
}

export default VerificationPage