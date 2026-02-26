import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfileImageInput from '../../components/Inputs/ProfileImageInput';
import { validateEmail } from '../../utils/helper';
import { useSignupMutation } from '../../services/authApi';
import Loader from '../../components/Inputs/Loader';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/authSlice';


const Signup = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [fetchLogin, { isLoading }] = useSignupMutation();

  async function handleSignup(e) {
    try {
      e.preventDefault();

      if (!name) {
        setError('Kindly enter your full name.');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      if (!password) {
        setError('Please enter a password.');
        return;
      }

      if (password < 8) {
        setError('Password should have minimum characters.');
        return;
      }

      setError(null)

      let formData = new FormData();


      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      formData.append('image', profilePic);

      let res = await fetchLogin(formData).unwrap();

      if (!res.success) {
        alert(res.message);
        return;
      }

      navigate('/login')

    } catch (error) {
      alert(error?.message || error?.data?.message)
    }
  }

  if (isLoading) {
    return <Loader />
  }


  return (
    <AuthLayout>
      <div className='lg:w-full h-auto md:h-full mt-10 md:mt-5 flex flex-col justify-center'>
        <h3 className='text-xl text-black font-semibold'>Create an acount</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details today
        </p>
        <form action="" onSubmit={handleSignup}>

          <ProfileImageInput image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <Input
              type='text'
              label='Enter your full name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Hassan'
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="hassan@example.com"
              type="text"
            />

            <div className='md:col-span-2'>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />

            </div>


          </div>
          {error && <p className='text-red-600 my-3 text-sm'>{error}</p>}

          <button type='submit' className='btn-primary' onClick={handleSignup} >SIGNUP</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link to="/login" className='font-medium text-primary underline'>
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup