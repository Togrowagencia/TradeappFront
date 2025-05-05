import React, { useState } from 'react';
import Traductor from '../components/Traductor';
import { requestResetPassword } from '../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Reset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      await requestResetPassword(email);
      toast.success('An email has been sent with instructions to reset your password');
      setEmail('');
    } catch (error) {
      toast.error(error.message || 'Error requesting password reset');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center fondo-bg">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='w-[99%] h-[97vh] rounded-[35px] bg-[url("/images/imagen-envio.png")] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center relative'>

        <div className="flex justify-end items-start w-full px-[3%] py-[1.5%] absolute top-0">
          <div className="w-auto border-[1px] border-[#999] rounded-[18px] flex items-center h-auto justify-start py-1 hover:bg-[#333] hover:border-[#333]">
            <Traductor />
          </div>
        </div>

        <div className='w-[45%] h-[50%] fondo-bg rounded-[35px] flex-col flex border-[1px] border-[#E53935] items-center lp:h-[38vh]'>
          <div className=' h-full flex flex-col justify-center items-center gap-5'>
            <h2 className='blanco flex text-center my-2'>Recover your password</h2>
            <p className='textos blanco flex text-center px-[10%]'>
              Enter your email address and you will receive a link to regain access to the platform
            </p>

            <form onSubmit={handleSubmit} className='w-[75%] h-[20%] flex flex-col justify-center items-center my-4'>
              <div className='flex w-full mt-10 border-b py-2 gap-1'>
                <img src="/svg/reset/correo.svg" alt="" className='mx-2 w-[7%]' />
                <input 
                  type="email" 
                  className='inputs-login textos blanco' 
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className={`w-full text-center rojo-intenso-bg textos blanco my-5 py-5 rounded-[82px] hover:bg-[#b71c1c] transition-colors ${isLoading ? "text-loading" : ""}`}
                disabled={isLoading}

              >
                {isLoading ? '' : 'Reset password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;