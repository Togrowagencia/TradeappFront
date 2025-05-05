import React from 'react';
import Traductor from '../Traductor';
import RangoFecha from '../RangoFecha'

const Header = ({ onDateChange }) => {
  
  const handleDateRangeChange = (startDate, endDate) => {
    onDateChange(startDate, endDate);
  };

  return (
    <div className='w-full h-[10%] flex items-center gap-6 justify-end px-4'>
      <RangoFecha onDateChange={handleDateRangeChange} />
      <div className='w-auto border-[1px] border-[#333] rounded-[18px] flex gap-2 items-center h-[41%] justify-start hover:bg-[#333] hover:border-[#333]'>
        <Traductor />
      </div>
    </div>
  );
};

export default Header;
