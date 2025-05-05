import React from 'react';

const Banner = () => {

  return (
    <div className='w-[94.9%] h-[24.3%] rojo-alerta-bg border-[1px] flex border-[#fff] rounded-[10px]'>
      <div className='w-[70%] h-full flex flex-col justify-center items-start px-6 gap-2 my-1'>
        <h3 className='fondo'>Welcome Back to</h3>
        <h1 className='blanco'>Trade The App</h1>
      </div>
      <div className='w-[30%] h-full flex justify-start items-end'>
        <img src="\images\banner.png" alt="" />
      </div>
    </div>
  )
}

export default Banner
