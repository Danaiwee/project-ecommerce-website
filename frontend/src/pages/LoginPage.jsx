import {motion} from 'framer-motion';
import { UserPlus, Mail, Lock, ArrowRight, Loader } from "lucide-react";

import InputField from '../components/InputField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';

const LogingPage = () => {
  const {login, isLoading} = useUserStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChage = (e) => {
    const {name, value} = e.target;

    setFormData({...formData, [name]: value})
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };


  return (
    <main className='flex flex-col items-center py-12 sm:px-6 lg:px-8 mx-5'>
      <motion.div 
        className='flex items-center justify-center'
        initial={{opacity: 0, y:-20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}
      >
        <h1 className='text-3xl sm:text-4xl font-bold text-emerald-500'>
          Sign in to your account
        </h1>
      </motion.div>

      <motion.div
        className='w-full max-w-lg flex flex-col items-center px-10 py-8 bg-gray-900 mt-10 rounded-lg'
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 1, delay:0.5}}
      >
        <form 
          className='w-full flex flex-col gap-5 pb-6'
          onSubmit={handleFormSubmit}  
        >
          <InputField 
            label='Email Address'
            id='email'
            name='email'
            icon={Mail}
            placeholder='john@email.com'
            value={formData.email}
            onChange={handleInputChage}
          />

          <InputField 
            type='password'
            label='Password'
            id='password'
            name='password'
            icon={Lock}
            placeholder='••••••••'
            value={formData.password}
            onChange={handleInputChage}
          />

          <button className='w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-gray-300 cursor-pointer mt-3' >
              {isLoading ? (
                <>
                <Loader className='size-5 animate-spin' />
                <span className='text-md font-medium'>Loading...</span>
                </>
              ) : (
                <>
                <UserPlus className='size-5' />
                <span className='text-md font-medium'>Login</span>
                </>
              )}
          </button>
        </form>

        <div className='flex items-center'>
          <p className='text-sm text-gray-500'>Not a member?</p>
          <Link to='/signup' className='flex items-center gap-1 text-emerald-500 hover:text-emerald-300 tex-sm transition-all duration-300'>
            <p className='text-sm'>&nbsp;Signup now</p>
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

export default LogingPage;