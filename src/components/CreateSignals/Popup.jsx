/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import { registerNotification } from "../../api/notifications";
import { toast } from "react-toastify";

const Popup = ({ isPopupOpen, handlePopupClose, formData, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const formatValue = (value) => value || "-";
    const formatCurrency = (value) => value ? `$${value}` : "-";

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            
            // Crear FormData
            const formDataToSend = new FormData();

            // Agregar datos básicos
            formDataToSend.append('symbol', formData.symbol?.symbol || '');
            formDataToSend.append('timeFrame', formData.timeFrame || '');
            formDataToSend.append('expirationTime', formData.expirationTime || '');
            formDataToSend.append('orderType', formData.orderType || '');
            formDataToSend.append('potentialEntry1', formData.entry1 || '');
            formDataToSend.append('potentialEntry2', formData.entry2 || '');
            formDataToSend.append('stoplLoss', formData.stoplLoss || '');
            formDataToSend.append('takeProfit', formData.takeProfit || '');
            formDataToSend.append('comments', formData.comments || '');

            // Agregar imágenes si existen
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach((image, index) => {
                    if (image instanceof File) {
                        formDataToSend.append(`images`, image);
                    }
                });
            }

            console.log('Enviando datos de notificación:', {
                symbol: formData.symbol?.symbol,
                timeFrame: formData.timeFrame,
                expirationTime: formData.expirationTime,
                orderType: formData.orderType,
                potentialEntry1: formData.entry1,
                potentialEntry2: formData.entry2,
                stoplLoss: formData.stoplLoss,
                takeProfit: formData.takeProfit,
                comments: formData.comments,
                images: formData.images
            });
            
            const response = await registerNotification(formDataToSend);
            console.log('Respuesta del servidor:', response);
            
            toast.success("Señal creada exitosamente", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Cerrar el popup y notificar éxito
            handlePopupClose();
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al crear la señal:', error);
            toast.error("Error al crear la señal", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <Drawer
                rootClassName="drawer-create-signal"
                placement="right"
                onClose={handlePopupClose}
                open={isPopupOpen}
                width={812}
                closable={false}
                headerStyle={{ display: "none" }}
                drawerStyle={{
                    borderRadius: "10px",
                    backgroundColor: "#16171C",
                    border: "1px solid #fff",
                }}
            >
                <div className="h-full w-full">
                    {/* Botón de cierre */}
                    <div className="absolute top-5 right-5 cursor-pointer" onClick={handlePopupClose}>
                        <img src="/svg/Historial/cerrar.svg" alt="Cerrar" />
                    </div>

                    <div className="">
                        <h3 className="blanco mb-2">Resume new signal</h3>

                        <table className="w-full h-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="py-3 px-5"><h4 className="blanco">Symbol</h4></th>
                                    <th className="py-3 px-5"><h4 className="blanco">Time Frame</h4></th>
                                    <th className="py-3 px-5"><h4 className="blanco">Expiration time</h4></th>
                                    <th className="py-3 px-5"><h4 className="blanco">Order Type</h4></th>
                                    <th className="py-3 px-5"><h4 className="blanco">Entry 1</h4></th>
                                    <th className="py-3 px-5"><h4 className="blanco">Entry 2</h4></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="bg-[#333]">
                                    <td className="py-3 px-5 textos blanco rounded-l-[20px]">
                                        <div className="flex items-center gap-2">
                                            {formData.symbol?.image && (
                                                <img
                                                    src={formData.symbol.image}
                                                    alt={formData.symbol.symbol}
                                                    className="h-4 w-7.5"
                                                />
                                            )}
                                            {formData.symbol?.symbol || "-"}
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 textos blanco">
                                        {formatValue(formData.timeFrame)}
                                    </td>
                                    <td className="py-3 px-5 textos blanco">
                                        {formatValue(formData.expirationTime)}
                                    </td>
                                    <td className="py-3 px-5 textos blanco">
                                        {formatValue(formData.orderType)}
                                    </td>
                                    <td className="py-3 px-5 textos blanco">
                                        ${Number(Number(formData.entry1).toFixed(2)).toLocaleString('es-CO')}
                                    </td>
                                    <td className="py-3 px-5 textos blanco rounded-r-[20px]">
                                        ${Number(Number(formData.entry2).toFixed(2)).toLocaleString('es-CO')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-3 flex justify-end gap-4">
                            <button 
                                className="verde-exito-bg rounded-[20px] py-2 px-6 flex items-center gap-2 hover:bg-[#00C853] transition-colors"
                                onClick={handleConfirm}
                                disabled={isLoading}
                            >
                                <h4 className={isLoading ? "text-loading" : ""}>
                                    {isLoading ? "" : "Confirm new signal"}
                                </h4>
                                {!isLoading && <img src="/svg/CreateSignals/agregar2.svg" alt="Confirmar" />}
                            </button>

                            <button
                                onClick={handlePopupClose}
                                className="fondo-alternativo-bg rounded-[20px] py-2 px-6 hover:bg-[#2A2B32] transition-colors"
                                disabled={isLoading}
                            >
                                <h4 className="blanco">Cancel</h4>
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

Popup.propTypes = {
    isPopupOpen: PropTypes.bool.isRequired,
    handlePopupClose: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    onSuccess: PropTypes.func
};

export default Popup;
