/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Popup from "./Popup";
import PropTypes from 'prop-types';

const Tabla = ({ selectedSymbol, notifications, selectedStatus }) => {
    const [openDrawer1, setOpenDrawer1] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredData = notifications.filter(item =>
        (!selectedSymbol || item.symbol === selectedSymbol) &&
        (!selectedStatus || selectedStatus === "Status" || (item.idealStatus && item.idealStatus.toLowerCase() === selectedStatus.toLowerCase()))
    );

    const showDrawer1 = (item) => {
        setSelectedItem(item);
        setOpenDrawer1(true);
    };

    const onCloseDrawer1 = () => {
        setOpenDrawer1(false);
        setSelectedItem(null);
    };

    return (
        <div className="max-h-[72vh] w-[101.5%] overflow-y-scroll custom-scroll">
            <table className="w-[97%]">
                <thead>
                    <tr className="text-left sticky top-0 z-1 backdrop-blur-sm rounded-[20px]">
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Symbol</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Time Frame</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Expiration time</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Order Type</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Potential Entry 1</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco">Potential Entry 2</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4 className="blanco rounded-r-[20px]">Comments</h4> </th>
                        <th className="py-2 pr-2 pl-5"> <h4></h4> </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-[#333]" : ""}>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco rounded-l-[20px]" : "py-4 pr-2 pl-5 textos blanco rounded-l-[20px]"}>
                                <div className="flex items-center gap-2">
                                    <img src={item.logo} alt={item.symbol} className="w-7.5 h-4" />
                                    {item.symbol}
                                </div>
                            </td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{item.timeFrame}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{item.expirationTime}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{item.orderType}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{Number(Number(item.potentialEntry1).toFixed(2)).toLocaleString('es-CO')}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{Number(Number(item.potentialEntry2).toFixed(2)).toLocaleString('es-CO')}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco" : "py-4 pr-2 pl-5 textos blanco"}>{item.comments}</td>
                            <td className={index % 2 === 0 ? "py-2 pr-2 pl-5 textos blanco rounded-r-[20px]" : "py-4 pr-2 pl-5 textos blanco rounded-r-[20px]"}>
                                <img
                                    className="cursor-pointer"
                                    onClick={() => showDrawer1(item)}
                                    src="\svg\Historial\flecha.svg"
                                    alt="Ver detalles"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Popup isPopupOpen={openDrawer1} handlePopupClose={onCloseDrawer1} item={selectedItem} />
        </div>
    );
};

Tabla.propTypes = {
    selectedSymbol: PropTypes.string,
    notifications: PropTypes.array.isRequired
};

export default Tabla;