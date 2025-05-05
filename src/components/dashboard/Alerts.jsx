import React, { useMemo } from 'react'

const Alerts = ({ notifications }) => {
  const totalAlerts = notifications ? notifications.length : 0;

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMillis = now - new Date(date);
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    return `${diffInYears} years ago`;
  };

  const lastSignalTime = useMemo(() => {
    if (!notifications || notifications.length === 0) return 'No signals yet';

    const dates = notifications.map(item => new Date(item.createdAt));
    const latestDate = new Date(Math.max(...dates));
    return getTimeAgo(latestDate);
  }, [notifications]);

  return (
    <div className='flex flex-col w-full h-full gap-[4.6%]'>

      <div className='w-full h-[24.4%] flex items-start gris-carbon-bg border-[1px] border-[#00E676] rounded-[10px] py-8 px-6'>
        <div className='flex items-center justify-between w-full'>
          <div className='w-[53%]'>
            <h3 className='blanco'>Total Alerts Sent</h3>
          </div>
          <div className='verde-exito-bg rounded-[10px] px-3 flex items-center justify-center'>
            <h2 className='negro'>{totalAlerts}</h2>
          </div>
        </div>
      </div>

      <div className='w-full h-[69.2%] flex items-start gris-carbon-bg rounded-[10px] pt-8 px-6'>
        <div className='flex flex-col justify-between w-full h-full relative'>
          <div className='flex justify-between w-full'>
            <div className='w-[100%] flex flex-col gap-4'>
              <h3 className='blanco'>Add new signal</h3>
              <h4 className='blanco'>last signal {lastSignalTime}</h4>
            </div>

            <div className='flex justify-start items-start h-full'>
              <a href="/create-signals">
                <img src="/svg/dashboard/flecha.svg" alt="" className='cursor-pointer w-[2rem] h-[2rem]' />
              </a>
            </div>
          </div>

          <div className='flex justify-center items-center absolute w-[calc(145%-0.5rem)] bottom-0 ml-[-21%]'>
            <img src="\images\nueva-s.png" alt="" className='w-full object-contain' />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Alerts