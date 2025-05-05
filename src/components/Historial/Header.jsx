import React, { useState } from "react";
import Traductor from '../Traductor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css';

const statusOptions = ["Status", "Won", "Loss", "Discarded"];

const Header = ({ onSymbolSelect, symbols = [], selectedStatus, onStatusChange }) => {
    const [selectedSymbol, setSelectedSymbol] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const handleSelect = (symbol, logo) => {
        const newSelection = { symbol, logo };
        setSelectedSymbol(newSelection);
        setIsDropdownOpen(false);
        onSymbolSelect(symbol);
    };

    const handleClearSelection = () => {
        setSelectedSymbol(null);
        setIsDropdownOpen(false);
        onSymbolSelect(null);
    };

    return (
        <>
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
            <div className='w-[98%] h-[10%] flex items-center gap-2 my-7'>
                <div className='items-center h-full flex'>
                    <h2 className='blanco'>Historial</h2>
                </div>

                <div className='w-full flex items-center h-full justify-end gap-8'>

                    <div className="relative">
                        <div
                            className="border-[1px] border-[#333] rounded-[18px] flex items-center hover:border-[#333] justify-center px-2.5 py-2.5 gap-2 cursor-pointer"
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                        >
                            <h4 className="textos blanco">{selectedStatus}</h4>
                            <img src="\svg\CreateSignals\selectg.svg" alt="" />
                        </div>

                        {isStatusDropdownOpen && (
                            <div className="absolute top-full right-0 w-auto fondo-bg rounded-[10px] max-h-[200px] overflow-y-auto z-10">
                                {statusOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`flex items-center gap-2 p-2 hover:bg-[#fff] hover:text-[#000] cursor-pointer textos blanco w-[8rem] ${selectedStatus === option ? 'font-bold' : ''}`}
                                        onClick={() => {
                                            onStatusChange(option);
                                            setIsStatusDropdownOpen(false);
                                        }}
                                    >
                                        <span className="textos">{option}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='border-[1px] border-[#333] rounded-[18px] flex items-center p-2.5 cursor-pointer'
                        >
                            {selectedSymbol ? (
                                <div className="flex gap-1">
                                    <img src={selectedSymbol.logo} alt={selectedSymbol.symbol} className="w-7.5 h-4" />
                                    <span className="textos blanco">{selectedSymbol.symbol}</span>
                                    <img src="\svg\CreateSignals\selectg.svg" alt="" />
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    <a className="textos blanco">Select Symbol</a>
                                    <img src="\svg\CreateSignals\selectg.svg" alt="" />
                                </div>
                            )}
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 w-auto fondo-bg rounded-[10px] max-h-[200px] overflow-y-auto z-10">
                                <div
                                    className="flex items-center justify-center gap-2 p-2 hover:bg-[#fff] hover:text-[#000] cursor-pointer textos blanco"
                                    onClick={handleClearSelection}
                                >
                                    <span className="textos">All Symbols</span>
                                </div>
                                {symbols.map(({ symbol, logo }) => (
                                    <div
                                        key={`${symbol}-${logo}`}
                                        className="flex items-center gap-2 p-2 hover:bg-[#fff] hover:text-[#000] cursor-pointer textos blanco"
                                        onClick={() => handleSelect(symbol, logo)}
                                    >
                                        <img src={logo} alt={symbol} className="w-7.5 h-4" />
                                        <span className="textos">{symbol}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='border-[1px] border-[#333] rounded-[18px] flex gap-2 items-center p-1 hover:bg-[#333] hover:border-[#333]'>
                        <Traductor />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;