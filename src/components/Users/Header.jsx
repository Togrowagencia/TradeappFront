import React from 'react'
import Traductor from '../Traductor';

const Header = () => {
    return (
        <div className='w-[98%] h-[10%] flex items-center gap-2 mt-7'>
            <div className='items-center h-full flex'>
                <h2 className='blanco'>Users</h2>
            </div>
            <div className='w-full flex items-center h-full justify-end gap-8'>
                <div className='w-auto border-[1px] border-[#333] rounded-[18px] flex gap-2 items-center h-[41%] hover:bg-[#333] hover:border-[#333]'>
                    <Traductor />
                </div>
            </div>
        </div>
    )
}

export default Header;