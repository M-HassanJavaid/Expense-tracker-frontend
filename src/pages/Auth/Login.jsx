import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import Loader from '../../components/Inputs/Loader';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/authSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const [fetchLogin , { isLoading  }] = useLoginMutation();

    const navigate = useNavigate();

    async function handleLogin(e) {
        try {
            e.preventDefault();

            if (!email) {
                setError('Please enter an email address.');
                return;
            }


            if (!password) {
                setError('Please enter a password.');
                return;
            }

            setError(null)

            let res = await fetchLogin({email , password}).unwrap();

            console.log(res.user)

            dispatch(setLogin(res.user));
            
            if (!res.user.isVerified) {
                navigate('/getVerificationEmail');
                return;
            }


            
    

            navigate('/')


        } catch (error) {
            alert( error?.message || error?.data?.message || 'unknown error occured')
        }
    }

    if (isLoading){
        return <Loader/>
    }

    return (
        <AuthLayout>
            <div className='w-full max-w-md mx-auto md:mx-0 lg:w-[70%] h-full min-h-[70vh] flex flex-col justify-center py-6'>
                <h3 className='text-2xl md:text-3xl font-semibold text-black' >Welcome Back</h3>
                <p className='text-sm md:text-base text-slate-700 mt-1 mb-4' >Please enter your details to login</p>

                <form onSubmit={handleLogin} className='space-y-3'>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder="hassan@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Min 8 characters"
                        type="password"
                    />

                    {error && <p className='text-red-600 my-3 text-sm'>{error}</p>}

                    <button type='submit' className='btn-primary' >LOGIN</button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Don't have an account?{" "}
                        <Link to="/signup" className='font-medium text-primary underline'>
                            Signup
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default Login