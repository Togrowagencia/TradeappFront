import React, { useState } from 'react';
import Traductor from '../Traductor';
import Popup from '../CreateSignals/Popup';
import { useClear } from './ClearContext'; // Ajusta la ruta

const Header = ({ formData }) => {
    const { clearAll } = useClear();
    const [openDrawer1, setOpenDrawer1] = useState(false);

    const showDrawer1 = () => {
        setOpenDrawer1(true);
    };

    const onCloseDrawer1 = () => {
        setOpenDrawer1(false);
    };

    return (
        <div className='w-[98%] h-[10%] flex items-center my-7 lp:my-4'>
            <div className='items-center h-full flex w-[37%]'>
                <h2 className='blanco'>Create new signal</h2>
            </div>
            <div className='w-[63%] flex items-center h-full justify-end gap-5'>
                <div onClick={showDrawer1} className='cursor-pointer rojo-alerta-bg rounded-[18px] flex gap-2 items-center justify-center p-2 lp:gap-[2%] lp:px-1 lp:w-[20%]'>
                    <h4 className='blanco'>Add new signal</h4>
                    <img src="\svg\CreateSignals\agregar.svg" alt="" />
                </div>
                <button onClick={clearAll} className='gris-carbon-bg rounded-[18px] flex items-center justify-center p-[1.2%] lp:py-2.5 lp:px-3'>
                    <p className='textos blanco'>Clear all</p>
                </button>
                <div className='border-[1px] border-[#333] rounded-[18px] flex items-center justify-start p-1 lp:py-0.5 lp:px-0 hover:bg-[#333] hover:border-[#333]'>
                    <Traductor />
                </div>
            </div>

            {/* Primer Drawer (PagoCredito) */}
            <Popup
                isPopupOpen={openDrawer1}
                handlePopupClose={() => setOpenDrawer1(false)}
                formData={formData}
            />
        </div>
    )
}

export default Header;